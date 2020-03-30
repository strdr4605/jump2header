export function isHeader(line: string): boolean {
  return /^\#{1,6} /.test(line);
}

export function getLinkFromHeader(header: string): string {
  return `#${header.split(/\s+/).slice(1).join("-").toLocaleLowerCase()}`;
}
