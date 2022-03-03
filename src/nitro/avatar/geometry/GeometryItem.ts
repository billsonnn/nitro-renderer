import { Node3D } from './Node3D';
import { Vector3D } from './Vector3D';

export class GeometryItem extends Node3D
{
    private _id: string;
    private _radius: number;
    private _normal: Vector3D;
    private _isDoubleSided: boolean;
    private _isDynamic: boolean;

    constructor(k: any, _arg_2: boolean = false)
    {
        super(parseFloat(k.x), parseFloat(k.y), parseFloat(k.z));

        this._id = k.id;
        this._radius = parseFloat(k.radius);
        this._normal = new Vector3D(parseFloat(k.nx), parseFloat(k.ny), parseFloat(k.nz));
        this._isDoubleSided = k.double || false;
        this._isDynamic = _arg_2;
    }

    public getDistance(k: Vector3D): number
    {
        const _local_2 = Math.abs(((k.z - this.transformedLocation.z) - this._radius));
        const _local_3 = Math.abs(((k.z - this.transformedLocation.z) + this._radius));

        return Math.min(_local_2, _local_3);
    }

    public get id(): string
    {
        return this._id;
    }

    public get normal(): Vector3D
    {
        return this._normal;
    }

    public get isDoubleSided(): boolean
    {
        return this._isDoubleSided;
    }

    public toString(): string
    {
        return ((((this._id + ': ') + this.location) + ' - ') + this.transformedLocation);
    }

    public get isDynamic(): boolean
    {
        return this._isDynamic;
    }
}
