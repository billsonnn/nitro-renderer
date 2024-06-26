export interface IVector3D
{
    assign(vector: IVector3D): void;
    add(vector: IVector3D): void;
    subtract(vector: IVector3D): void;
    multiply(amount: number): void;
    divide(amount: number): void;
    negate(): void;
    dotProduct(vector: IVector3D): number;
    crossProduct(vector: IVector3D): IVector3D;
    normalize(): void;
    x: number;
    y: number;
    z: number;
    length: number;
    toString(): string;
}
