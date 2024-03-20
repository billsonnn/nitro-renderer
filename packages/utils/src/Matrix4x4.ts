import { IVector3D } from '@nitrots/api';
import { Vector3d } from './Vector3d';

export class Matrix4x4
{
    public static IDENTITY:Matrix4x4 = new Matrix4x4(1, 0, 0, 0, 1, 0, 0, 0, 1);
    private static TOLERANS: number = 1E-18;

    private _data: number[];

    constructor(k: number = 0, _arg_2: number = 0, _arg_3: number = 0, _arg_4: number = 0, _arg_5: number = 0, _arg_6: number = 0, _arg_7: number = 0, _arg_8: number = 0, _arg_9: number = 0)
    {
        this._data = [k, _arg_2, _arg_3, _arg_4, _arg_5, _arg_6, _arg_7, _arg_8, _arg_9];
    }

    public static getXRotationMatrix(k: number): Matrix4x4
    {
        const _local_2 = ((k * Math.PI) / 180);
        const _local_3 = Math.cos(_local_2);
        const _local_4 = Math.sin(_local_2);

        return new Matrix4x4(1, 0, 0, 0, _local_3, -(_local_4), 0, _local_4, _local_3);
    }

    public static getYRotationMatrix(k: number): Matrix4x4
    {
        const _local_2 = ((k * Math.PI) / 180);
        const _local_3 = Math.cos(_local_2);
        const _local_4 = Math.sin(_local_2);

        return new Matrix4x4(_local_3, 0, _local_4, 0, 1, 0, -(_local_4), 0, _local_3);
    }

    public static getZRotationMatrix(k: number): Matrix4x4
    {
        const _local_2 = ((k * Math.PI) / 180);
        const _local_3 = Math.cos(_local_2);
        const _local_4 = Math.sin(_local_2);

        return new Matrix4x4(_local_3, -(_local_4), 0, _local_4, _local_3, 0, 0, 0, 1);
    }

    public identity(): Matrix4x4
    {
        this._data = [1, 0, 0, 0, 1, 0, 0, 0, 1];

        return this;
    }

    public vectorMultiplication(k: IVector3D): IVector3D
    {
        const _local_2 = (((k.x * this._data[0]) + (k.y * this._data[3])) + (k.z * this._data[6]));
        const _local_3 = (((k.x * this._data[1]) + (k.y * this._data[4])) + (k.z * this._data[7]));
        const _local_4 = (((k.x * this._data[2]) + (k.y * this._data[5])) + (k.z * this._data[8]));

        return new Vector3d(_local_2, _local_3, _local_4);
    }

    public multiply(k:Matrix4x4): Matrix4x4
    {
        const _local_2 = (((this._data[0] * k.data[0]) + (this._data[1] * k.data[3])) + (this._data[2] * k.data[6]));
        const _local_3 = (((this._data[0] * k.data[1]) + (this._data[1] * k.data[4])) + (this._data[2] * k.data[7]));
        const _local_4 = (((this._data[0] * k.data[2]) + (this._data[1] * k.data[5])) + (this._data[2] * k.data[8]));
        const _local_5 = (((this._data[3] * k.data[0]) + (this._data[4] * k.data[3])) + (this._data[5] * k.data[6]));
        const _local_6 = (((this._data[3] * k.data[1]) + (this._data[4] * k.data[4])) + (this._data[5] * k.data[7]));
        const _local_7 = (((this._data[3] * k.data[2]) + (this._data[4] * k.data[5])) + (this._data[5] * k.data[8]));
        const _local_8 = (((this._data[6] * k.data[0]) + (this._data[7] * k.data[3])) + (this._data[8] * k.data[6]));
        const _local_9 = (((this._data[6] * k.data[1]) + (this._data[7] * k.data[4])) + (this._data[8] * k.data[7]));
        const _local_10 = (((this._data[6] * k.data[2]) + (this._data[7] * k.data[5])) + (this._data[8] * k.data[8]));

        return new Matrix4x4(_local_2, _local_3, _local_4, _local_5, _local_6, _local_7, _local_8, _local_9, _local_10);
    }

    public scalarMultiply(k: number): void
    {
        let index = 0;

        while(index < this._data.length)
        {
            this._data[index] = (this._data[index] * k);

            index++;
        }
    }

    public rotateX(k: number): Matrix4x4
    {
        const _local_2 = ((k * Math.PI) / 180);
        const _local_3 = Math.cos(_local_2);
        const _local_4 = Math.sin(_local_2);
        const _local_5 = new Matrix4x4(1, 0, 0, 0, _local_3, -(_local_4), 0, _local_4, _local_3);

        return _local_5.multiply(this);
    }

    public rotateY(k: number): Matrix4x4
    {
        const _local_2 = ((k * Math.PI) / 180);
        const _local_3 = Math.cos(_local_2);
        const _local_4 = Math.sin(_local_2);
        const _local_5 = new Matrix4x4(_local_3, 0, _local_4, 0, 1, 0, -(_local_4), 0, _local_3);

        return _local_5.multiply(this);
    }

    public rotateZ(k: number): Matrix4x4
    {
        const _local_2 = ((k * Math.PI) / 180);
        const _local_3 = Math.cos(_local_2);
        const _local_4 = Math.sin(_local_2);
        const _local_5 = new Matrix4x4(_local_3, -(_local_4), 0, _local_4, _local_3, 0, 0, 0, 1);

        return _local_5.multiply(this);
    }

    public skew(): void
    {
    }

    public transpose(): Matrix4x4
    {
        return new Matrix4x4(this._data[0], this._data[3], this._data[6], this._data[1], this._data[4], this._data[7], this._data[2], this._data[5], this._data[8]);
    }

    public equals(k: Matrix4x4): boolean
    {
        return false;
    }

    public get data(): number[]
    {
        return this._data;
    }
}
