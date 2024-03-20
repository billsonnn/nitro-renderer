import { IVector3D } from '@nitrots/api';

export class Vector3d implements IVector3D
{
    private _length: number = NaN;

    constructor(
        private _x: number = 0,
        private _y: number = 0,
        private _z: number = 0)
    {}

    public static sum(vector1: IVector3D, vector2: IVector3D): Vector3d
    {
        if(!vector1 || !vector2) return null;

        return new Vector3d((vector1.x + vector2.x), (vector1.y + vector2.y), (vector1.z + vector2.z));
    }

    public static dif(vector1: IVector3D, vector2: IVector3D): Vector3d
    {
        if(!vector1 || !vector2) return null;

        return new Vector3d((vector1.x - vector2.x), (vector1.y - vector2.y), (vector1.z - vector2.z));
    }

    public static product(vector: IVector3D, value: number): Vector3d
    {
        if(!vector) return null;

        return new Vector3d((vector.x * value), (vector.y * value), (vector.z * value));
    }

    public static dotProduct(vector1: IVector3D, vector2: IVector3D): number
    {
        if(!vector1 || !vector2) return 0;

        return (vector1.x * vector2.x) + (vector1.y * vector2.y) + (vector1.z * vector2.z);
    }

    public static crossProduct(vector1: IVector3D, vector2: IVector3D): Vector3d
    {
        if(!vector1 || !vector2) return null;

        const product = new Vector3d();

        product.x = ((vector1.y * vector2.z) - (vector1.z * vector2.y));
        product.y = ((vector1.z * vector2.x) - (vector1.x * vector2.z));
        product.z = ((vector1.x * vector2.y) - (vector1.y * vector2.x));

        return product;
    }

    public static scalarProjection(vector1: IVector3D, vector2: IVector3D): number
    {
        if(!vector1 || !vector2) return -1;

        const length = vector2.length;

        if(length > 0)
        {
            return ((vector1.x * vector2.x) + (vector1.y * vector2.y) + (vector1.z * vector2.z)) / length;
        }

        return -1;
    }

    public static cosAngle(vector1: IVector3D, vector2: IVector3D): number
    {
        if(!vector1 || !vector2) return 0;

        const totalLength = (vector1.length * vector2.length);

        if(!totalLength) return 0;

        return (Vector3d.dotProduct(vector1, vector2) / totalLength);
    }

    public static isEqual(vector1: IVector3D, vector2: IVector3D): boolean
    {
        if(!vector1 || !vector2) return false;

        if((vector1.x !== vector2.x) || (vector1.y !== vector2.y) || (vector1.z !== vector2.z)) return false;

        return true;
    }

    public assign(vector: IVector3D): void
    {
        if(!vector) return;

        this._x = vector.x;
        this._y = vector.y;
        this._z = vector.z;
        this._length = NaN;
    }

    public add(vector: IVector3D): void
    {
        if(!vector) return;

        this._x += vector.x;
        this._y += vector.y;
        this._z += vector.z;
        this._length = NaN;
    }

    public subtract(vector: IVector3D): void
    {
        if(!vector) return;

        this._x -= vector.x;
        this._y -= vector.y;
        this._z -= vector.z;
        this._length = NaN;
    }

    public multiply(amount: number): void
    {
        this._x *= amount;
        this._y *= amount;
        this._z *= amount;
        this._length = NaN;
    }

    public divide(amount: number): void
    {
        if(!amount) return;

        this._x /= amount;
        this._y /= amount;
        this._z /= amount;
        this._length = NaN;
    }

    public negate(): void
    {
        this._x = -(this._x);
        this._y = -(this._y);
        this._z = -(this._z);
    }

    public dotProduct(vector: IVector3D): number
    {
        return ((this._x * vector.x) + (this._y * vector.y)) + (this._z * vector.z);
    }

    public crossProduct(vector: IVector3D): IVector3D
    {
        const newVector = new Vector3d();

        newVector.x = ((this._y * vector.z) - (this._z * vector.y));
        newVector.y = ((this._z * vector.x) - (this._x * vector.z));
        newVector.z = ((this._x * vector.y) - (this._y * vector.x));

        return newVector;
    }

    public normalize(): void
    {
        const k = (1 / this.length);

        this._x = (this._x * k);
        this._y = (this._y * k);
        this._z = (this._z * k);
    }

    public get x(): number
    {
        return this._x;
    }

    public set x(k: number)
    {
        this._x = k;
        this._length = NaN;
    }

    public get y(): number
    {
        return this._y;
    }

    public set y(k: number)
    {
        this._y = k;
        this._length = NaN;
    }

    public get z(): number
    {
        return this._z;
    }

    public set z(k: number)
    {
        this._z = k;
        this._length = NaN;
    }

    public get length(): number
    {
        if(isNaN(this._length))
        {
            this._length = Math.sqrt(((this._x * this._x) + (this._y * this._y)) + (this._z * this._z));
        }

        return this._length;
    }

    public toString(): string
    {
        return `[Vector3d: ${this._x}, ${this._y}, ${this._z}]`;
    }
}
