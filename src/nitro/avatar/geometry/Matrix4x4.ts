import { Vector3D } from './Vector3D';

export class Matrix4x4
{
    public static IDENTITY:Matrix4x4    = new Matrix4x4(1, 0, 0, 0, 1, 0, 0, 0, 1);
    private static TOLERANS: number     = 1E-18;

    private _data: number[];

    constructor(k: number = 0, _arg_2: number = 0, _arg_3: number = 0, _arg_4: number = 0, _arg_5: number = 0, _arg_6: number = 0, _arg_7: number = 0, _arg_8: number = 0, _arg_9: number = 0)
    {
        this._data = [k, _arg_2, _arg_3, _arg_4, _arg_5, _arg_6, _arg_7, _arg_8, _arg_9];
    }

    public static _Str_1869(k: number): Matrix4x4
    {
        const _local_2 = ((k * Math.PI) / 180);
        const _local_3 = Math.cos(_local_2);
        const _local_4 = Math.sin(_local_2);

        return new Matrix4x4(1, 0, 0, 0, _local_3, -(_local_4), 0, _local_4, _local_3);
    }

    public static _Str_1560(k: number): Matrix4x4
    {
        const _local_2 = ((k * Math.PI) / 180);
        const _local_3 = Math.cos(_local_2);
        const _local_4 = Math.sin(_local_2);

        return new Matrix4x4(_local_3, 0, _local_4, 0, 1, 0, -(_local_4), 0, _local_3);
    }

    public static _Str_1368(k: number): Matrix4x4
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

    public _Str_2186(k: Vector3D): Vector3D
    {
        const _local_2 = (((k.x * this._data[0]) + (k.y * this._data[3])) + (k.z * this._data[6]));
        const _local_3 = (((k.x * this._data[1]) + (k.y * this._data[4])) + (k.z * this._data[7]));
        const _local_4 = (((k.x * this._data[2]) + (k.y * this._data[5])) + (k.z * this._data[8]));

        return new Vector3D(_local_2, _local_3, _local_4);
    }

    public _Str_1186(k:Matrix4x4): Matrix4x4
    {
        const _local_2  = (((this._data[0] * k.data[0]) + (this._data[1] * k.data[3])) + (this._data[2] * k.data[6]));
        const _local_3  = (((this._data[0] * k.data[1]) + (this._data[1] * k.data[4])) + (this._data[2] * k.data[7]));
        const _local_4  = (((this._data[0] * k.data[2]) + (this._data[1] * k.data[5])) + (this._data[2] * k.data[8]));
        const _local_5  = (((this._data[3] * k.data[0]) + (this._data[4] * k.data[3])) + (this._data[5] * k.data[6]));
        const _local_6  = (((this._data[3] * k.data[1]) + (this._data[4] * k.data[4])) + (this._data[5] * k.data[7]));
        const _local_7  = (((this._data[3] * k.data[2]) + (this._data[4] * k.data[5])) + (this._data[5] * k.data[8]));
        const _local_8  = (((this._data[6] * k.data[0]) + (this._data[7] * k.data[3])) + (this._data[8] * k.data[6]));
        const _local_9  = (((this._data[6] * k.data[1]) + (this._data[7] * k.data[4])) + (this._data[8] * k.data[7]));
        const _local_10 = (((this._data[6] * k.data[2]) + (this._data[7] * k.data[5])) + (this._data[8] * k.data[8]));

        return new Matrix4x4(_local_2, _local_3, _local_4, _local_5, _local_6, _local_7, _local_8, _local_9, _local_10);
    }

    public _Str_1157(k: number): void
    {
        let index = 0;

        while(index < this._data.length)
        {
            this._data[index] = (this._data[index] * k);

            index++;
        }
    }

    public _Str_1089(k: number): Matrix4x4
    {
        const _local_2 = ((k * Math.PI) / 180);
        const _local_3 = Math.cos(_local_2);
        const _local_4 = Math.sin(_local_2);
        const _local_5 = new Matrix4x4(1, 0, 0, 0, _local_3, -(_local_4), 0, _local_4, _local_3);

        return _local_5._Str_1186(this);
    }

    public _Str_2123(k: number): Matrix4x4
    {
        const _local_2 = ((k * Math.PI) / 180);
        const _local_3 = Math.cos(_local_2);
        const _local_4 = Math.sin(_local_2);
        const _local_5 = new Matrix4x4(_local_3, 0, _local_4, 0, 1, 0, -(_local_4), 0, _local_3);

        return _local_5._Str_1186(this);
    }

    public _Str_2232(k: number): Matrix4x4
    {
        const _local_2 = ((k * Math.PI) / 180);
        const _local_3 = Math.cos(_local_2);
        const _local_4 = Math.sin(_local_2);
        const _local_5 = new Matrix4x4(_local_3, -(_local_4), 0, _local_4, _local_3, 0, 0, 0, 1);

        return _local_5._Str_1186(this);
    }

    public skew(): void
    {
    }

    public _Str_1779(): Matrix4x4
    {
        return new Matrix4x4(this._data[0], this._data[3], this._data[6], this._data[1], this._data[4], this._data[7], this._data[2], this._data[5], this._data[8]);
    }

    public _Str_1451(k: Matrix4x4): boolean
    {
        return false;
    }

    public get data(): number[]
    {
        return this._data;
    }
}