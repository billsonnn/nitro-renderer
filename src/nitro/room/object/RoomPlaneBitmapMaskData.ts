import { IVector3D, Vector3d } from '../../../api';

export class RoomPlaneBitmapMaskData
{
    public static WINDOW: string = 'window';
    public static HOLE: string = 'hole';

    private _loc: Vector3d;
    private _type: string;
    private _category: string;

    constructor(type: string, loc: IVector3D, category: string)
    {
        this.type = type;
        this.loc = loc;
        this.category = category;
    }

    public get loc(): IVector3D
    {
        return this._loc;
    }

    public set loc(k: IVector3D)
    {
        if(!this._loc) this._loc = new Vector3d();

        this._loc.assign(k);
    }

    public get type(): string
    {
        return this._type;
    }

    public set type(type: string)
    {
        this._type = type;
    }

    public get category(): string
    {
        return this._category;
    }

    public set category(category: string)
    {
        this._category = category;
    }

    public dispose(): void
    {
        this._loc = null;
    }
}
