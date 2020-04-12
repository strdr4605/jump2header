export interface CliArgv {
  file: string;
  output?: string;
  slug?: string;
  maxLevel: number;
  emoji: number;
  silent?: boolean;
}

export interface HeaderType {
  index: number;
  text: string;
  level: number;
  slug: string;
}
