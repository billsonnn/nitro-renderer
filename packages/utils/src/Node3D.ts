import { IVector3D } from '@nitrots/api';
import { Matrix4x4 } from './Matrix4x4';
import { Vector3d } from './Vector3d';

export class Node3D
{
    private _location: IVector3D = null;
    private _transformedLocation: IVector3D = new Vector3d();
    private _needsTransformation: boolean = false;

    constructor(x: number, y: number, z: number)
    {
        this._location = new Vector3d(x, y, z);

        if((x !== 0) || (y !== 0) || (z !== 0)) this._needsTransformation = true;
    }

    public get location(): IVector3D
    {
        return this._location;
    }

    public get transformedLocation(): IVector3D
    {
        return this._transformedLocation;
    }

    public applyTransform(matrix: Matrix4x4): void
    {
        if(this._needsTransformation) this._transformedLocation = matrix.vectorMultiplication(this._location);
    }
}
