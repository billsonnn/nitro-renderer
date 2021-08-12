export class Vector3D
{
    private _x: number;
    private _y: number;
    private _z: number;

    constructor(k: number = 0, _arg_2: number = 0, _arg_3: number = 0)
    {
        this._x = k;
        this._y = _arg_2;
        this._z = _arg_3;
    }

    public static dot(k: Vector3D, _arg_2: Vector3D): number
    {
        return ((k.x * _arg_2.x) + (k.y * _arg_2.y)) + (k.z * _arg_2.z);
    }

    public static cross(k: Vector3D, _arg_2: Vector3D): Vector3D
    {
        const _local_3 = new Vector3D();

        _local_3.x = ((k.y * _arg_2.z) - (k.z * _arg_2.y));
        _local_3.y = ((k.z * _arg_2.x) - (k.x * _arg_2.z));
        _local_3.z = ((k.x * _arg_2.y) - (k.y * _arg_2.x));

        return _local_3;
    }

    public static subtract(k: Vector3D, _arg_2: Vector3D): Vector3D
    {
        return new Vector3D((k.x - _arg_2.x), (k.y - _arg_2.y), (k.z - _arg_2.z));
    }

    public dot(k: Vector3D): number
    {
        return ((this._x * k.x) + (this._y * k.y)) + (this._z * k.z);
    }

    public cross(k: Vector3D): Vector3D
    {
        const _local_2 = new Vector3D();

        _local_2.x = ((this._y * k.z) - (this._z * k.y));
        _local_2.y = ((this._z * k.x) - (this._x * k.z));
        _local_2.z = ((this._x * k.y) - (this._y * k.x));

        return _local_2;
    }

    public subtract(k: Vector3D): void
    {
        this._x = (this._x - k.x);
        this._y = (this._y - k.y);
        this._z = (this._z - k.z);
    }

    public add(k: Vector3D): void
    {
        this._x = (this._x + k.x);
        this._y = (this._y + k.y);
        this._z = (this._z + k.z);
    }

    public normalize(): void
    {
        const k = (1 / this.length());

        this._x = (this._x * k);
        this._y = (this._y * k);
        this._z = (this._z * k);
    }

    public scaleBy(value: number): void
    {
        this._x *= value;
        this._y *= value;
        this._z *= value;
    }

    public length(): number
    {
        return Math.sqrt((((this._x * this._x) + (this._y * this._y)) + (this._z * this._z)));
    }

    public toString(): string
    {
        return (((((('Vector3D: (' + this._x) + ',') + this._y) + ',') + this._z) + ')');
    }

    public get x(): number
    {
        return this._x;
    }

    public set x(k: number)
    {
        this._x = k;
    }

    public get y(): number
    {
        return this._y;
    }

    public set y(k: number)
    {
        this._y = k;
    }

    public get z(): number
    {
        return this._z;
    }

    public set z(k: number)
    {
        this._z = k;
    }
}
