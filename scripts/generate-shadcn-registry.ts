import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(import.meta.dirname, '..');
const REGISTRY_CONTENT_DIRECTORY = path.join(
  ROOT,
  'src/data/contents/registry',
);
const ANIMATED_COMPONENT_DIRECTORY = path.join(
  ROOT,
  'src/data/contents/animated-components',
);
const BASE_COMPONENT_DIRECTORY = path.join(
  ROOT,
  'src/data/contents/components',
);
const OUTPUT_DIRECTORY = path.join(ROOT, 'public/r');
const REGISTRY_MANIFEST_PATH = path.join(ROOT, 'public/registry.json');

// Dashboards, blocks and templates are built in the watermellon-registry repo.
// registry.watermelon.sh is served by this worker, so those items have to be
// published here too or their install commands 404.
const UPSTREAM_REGISTRY_URL =
  process.env.WATERMELON_UPSTREAM_REGISTRY_URL ??
  'https://raw.githubusercontent.com/WatermelonCorp/watermellon-registry/main/public/r';
const UPSTREAM_FETCH_CONCURRENCY = 16;

type UpstreamRegistryItem = { name: string } & Record<string, unknown>;

type RegistryItem = {
  $schema: string;
  name: string;
  type: 'registry:component';
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies?: string[];
  files: Array<{
    path: string;
    type: 'registry:component';
    content: string;
  }>;
};

function packageName(importSource: string) {
  if (importSource.startsWith('@')) {
    return importSource.split('/').slice(0, 2).join('/');
  }

  return importSource.split('/')[0];
}

function dependenciesFromSource(source: string) {
  const imports = source.matchAll(/from\s+['"]([^'"]+)['"]/g);
  const dependencies = new Set<string>();

  for (const match of imports) {
    const importSource = match[1];

    if (
      importSource.startsWith('.') ||
      importSource.startsWith('@/') ||
      importSource === 'react' ||
      importSource === 'react-dom'
    ) {
      continue;
    }

    dependencies.add(packageName(importSource));
  }

  return [...dependencies].sort();
}

async function readComponentVariant(slug: string, variant: 'original' | 'base') {
  return readFile(
    path.join(ANIMATED_COMPONENT_DIRECTORY, slug, `${variant}.tsx`),
    'utf8',
  );
}

function quotedValue(source: string, name: string) {
  return source.match(new RegExp(`${name}:\\s*['"]([^'"]+)['"]`))?.[1];
}

function registryDependenciesFromSource(source: string) {
  return [...source.matchAll(/@\/components\/(?:ui|base-ui)\/([a-z0-9-]+)/g)]
    .map((match) => match[1])
    .filter((value, index, values) => values.indexOf(value) === index)
    .sort();
}

async function buildBaseComponentItems() {
  const directories = await readdir(BASE_COMPONENT_DIRECTORY, { withFileTypes: true });
  const items: RegistryItem[] = [];

  for (const directory of directories.filter((entry) => entry.isDirectory()).sort((left, right) => left.name.localeCompare(right.name))) {
    const componentDirectory = path.join(BASE_COMPONENT_DIRECTORY, directory.name);
    const indexSource = await readFile(path.join(componentDirectory, 'index.ts'), 'utf8');
    const configSource = await readFile(path.join(componentDirectory, 'config.ts'), 'utf8');
    const categoryDescription = quotedValue(configSource, 'description') ?? `${directory.name} component variants.`;
    const variantPattern = /id:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?cli:\s*['"]([^'"]+)['"]/g;

    for (const match of indexSource.matchAll(variantPattern)) {
      const [, id, title, installCommand] = match;
      const name = installCommand.match(/\/r\/([^\s]+)\.json/)?.[1] ?? id;
      const variantNumber = Number(id.match(/(\d+)$/)?.[1]);
      const source = await readFile(path.join(componentDirectory, `variant-${variantNumber}.tsx`), 'utf8');
      const registryDependencies = registryDependenciesFromSource(source);

      items.push({
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name,
        type: 'registry:component',
        title,
        description: `${title}. ${categoryDescription}`,
        dependencies: dependenciesFromSource(source),
        ...(registryDependencies.length ? { registryDependencies } : {}),
        files: [{
          path: `components/watermelon/${name}.tsx`,
          type: 'registry:component',
          content: source,
        }],
      });
    }
  }

  return items;
}

export async function buildRegistryItems() {
  const files = await readdir(REGISTRY_CONTENT_DIRECTORY);
  const items: RegistryItem[] = [];

  for (const filename of files.filter((file) => file.endsWith('.mdx')).sort()) {
    const metadata = matter(
      await readFile(path.join(REGISTRY_CONTENT_DIRECTORY, filename), 'utf8'),
    ).data as { title?: string; slug?: string; description?: string };
    const slug = metadata.slug;

    if (!slug) continue;

    try {
      const original = await readComponentVariant(slug, 'original');
      const base = await readComponentVariant(slug, 'base');
      const dependencies = dependenciesFromSource(`${original}\n${base}`);
      const registryDependencies = original.includes("@/lib/utils") || base.includes("@/lib/utils")
        ? ['utils']
        : undefined;

      items.push({
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name: slug,
        type: 'registry:component',
        title: metadata.title ?? slug,
        description: metadata.description ?? `Watermelon UI component: ${slug}.`,
        dependencies,
        ...(registryDependencies ? { registryDependencies } : {}),
        files: [
          {
            path: `components/watermelon/${slug}.tsx`,
            type: 'registry:component',
            content: original,
          },
        ],
      });

      items.push({
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name: `${slug}-base`,
        type: 'registry:component',
        title: `${metadata.title ?? slug} (base)`,
        description: `Theme-ready base variant of ${metadata.description ?? slug}.`,
        dependencies,
        ...(registryDependencies ? { registryDependencies } : {}),
        files: [
          {
            path: `components/watermelon/${slug}.tsx`,
            type: 'registry:component',
            content: base,
          },
        ],
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
  }

  return [...items, ...(await buildBaseComponentItems())];
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// Items maintained in this repo win over upstream items with the same name.
export async function fetchUpstreamRegistryItems(
  excludeNames: Set<string>,
  baseUrl = UPSTREAM_REGISTRY_URL,
) {
  const catalog = await fetchJson<{ items: Array<{ name: string }> }>(
    `${baseUrl}/registry.json`,
  );
  const names = catalog.items
    .map((item) => item.name)
    .filter((name) => !excludeNames.has(name));
  const items: UpstreamRegistryItem[] = [];

  for (let index = 0; index < names.length; index += UPSTREAM_FETCH_CONCURRENCY) {
    const batch = names.slice(index, index + UPSTREAM_FETCH_CONCURRENCY);
    items.push(
      ...(await Promise.all(
        batch.map((name) => fetchJson<UpstreamRegistryItem>(`${baseUrl}/${name}.json`)),
      )),
    );
  }

  return items;
}

export async function generateShadcnRegistry(
  outputDirectory = OUTPUT_DIRECTORY,
  manifestPath = REGISTRY_MANIFEST_PATH,
  { includeUpstream = false }: { includeUpstream?: boolean } = {},
) {
  const localItems = await buildRegistryItems();
  const upstreamItems = includeUpstream
    ? await fetchUpstreamRegistryItems(new Set(localItems.map((item) => item.name)))
    : [];
  const items: Array<RegistryItem | UpstreamRegistryItem> = [...localItems, ...upstreamItems];

  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });

  await Promise.all(
    items.map((item) =>
      writeFile(
        path.join(outputDirectory, `${item.name}.json`),
        `${JSON.stringify(item, null, 2)}\n`,
      ),
    ),
  );

  const manifest = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'watermelon',
    homepage: 'https://ui.watermelon.sh',
    items,
  };

  const serialisedManifest = `${JSON.stringify(manifest, null, 2)}\n`;

  // The registry is published as `<origin>/r/{name}.json`, and the shadcn
  // CLI resolves the catalog by substituting `registry` for `{name}`. The
  // manifest therefore has to sit beside the items as well as at the root,
  // or `/r/registry.json` 404s while every item resolves fine.
  await Promise.all([
    writeFile(manifestPath, serialisedManifest),
    writeFile(path.join(outputDirectory, 'registry.json'), serialisedManifest),
  ]);

  return { items, manifest };
}

if (import.meta.main) {
  const { items } = await generateShadcnRegistry(OUTPUT_DIRECTORY, REGISTRY_MANIFEST_PATH, {
    includeUpstream: process.env.WATERMELON_SKIP_UPSTREAM_REGISTRY !== '1',
  });
  console.log(`Generated ${items.length} Watermelon shadcn registry items.`);
}
