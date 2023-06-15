export interface IVector3D {
  x: number;
  y: number;
  z: number;
  length: number;

  assign(vector: IVector3D): void;

  add(vector: IVector3D): void;

  subtract(vector: IVector3D): void;
}
