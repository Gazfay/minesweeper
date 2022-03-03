export interface IMapCell {
  rowIndex: number;
  cellIndex: number;
  type: null | string;
}

export interface IOpenCell {
  x: number;
  y: number;
}

export interface ISocketResult {
  type: string;
  result: any;
}

export type StartGameType = string | undefined;