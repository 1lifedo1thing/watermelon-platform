export type InlineSegment =
  | { type: 'text'; text: string }
  | { type: 'code'; text: string }
  | { type: 'link'; text: string; href: string };

// [label](href) links and `code` spans.
const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`/g;
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Split text into text, code, and link segments. */
export function parseInline(input: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let last = 0;
  for (const match of input.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) segments.push({ type: 'text', text: input.slice(last, index) });
    if (match[3] !== undefined) segments.push({ type: 'code', text: match[3] });
    else segments.push({ type: 'link', text: match[1], href: match[2] });
    last = index + match[0].length;
  }
  if (last < input.length) segments.push({ type: 'text', text: input.slice(last) });
  return segments;
}

/** Plain text with link and code markup removed, for meta tags and JSON-LD. */
export function stripInline(input: string) {
  return input.replace(LINK, '$1').replace(/`([^`]+)`/g, '$1');
}

/** Every href referenced by inline links. */
export function inlineHrefs(input: string) {
  return [...input.matchAll(LINK)].map((m) => m[2]);
}
