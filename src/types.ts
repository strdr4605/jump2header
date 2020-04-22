export type PositionType = "header" | "start" | "end";

export interface CliArgv {
  file: string;
  output?: string;
  slug?: string;
  position: PositionType | string;
  text?: string;
  start?: string;
  end?: string;
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
