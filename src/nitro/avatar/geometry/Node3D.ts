import { Matrix4x4 } from './Matrix4x4';
import { Vector3D } from './Vector3D';

export class Node3D
{
    private _location: Vector3D;
    private _transformedLocation: Vector3D;
    private _needsTransformation: boolean;

    constructor(k: number, _arg_2: number, _arg_3: number)
    {
        this._location = new Vector3D(k, _arg_2, _arg_3);
        this._transformedLocation = new Vector3D();
        this._needsTransformation = false;

        if(((!(k == 0)) || (!(_arg_2 == 0))) || (!(_arg_3 == 0))) this._needsTransformation = true;
    }

    public get location(): Vector3D
    {
        return this._location;
    }

    public get transformedLocation(): Vector3D
    {
        return this._transformedLocation;
    }

    public applyTransform(k: Matrix4x4): void
    {
        if(this._needsTransformation) this._transformedLocation = k.vectorMultiplication(this._location);
    }
}
