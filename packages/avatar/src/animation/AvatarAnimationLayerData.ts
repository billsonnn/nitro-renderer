import { IActionDefinition, IActiveActionData, IAnimationLayerData, IAssetAnimationFramePart } from '@nitrots/api';
import { ActiveActionData } from '../actions';

export class AvatarAnimationLayerData implements IAnimationLayerData
{
    public static BODYPART: string = 'bodypart';
    public static FX: string = 'fx';

    private _id: string;
    private _action: IActiveActionData;
    private _animationFrame: number;
    private _dx: number;
    private _dy: number;
    private _dz: number;
    private _directionOffset: number;
    private _type: string;
    private _base: string;
    private _items: Map<string, string>;

    constructor(k: IAssetAnimationFramePart, _arg_2: string, _arg_3: IActionDefinition)
    {
        this._id = k.id;
        this._animationFrame = (k.frame || 0);
        this._dx = (k.dx || 0);
        this._dy = (k.dy || 0);
        this._dz = (k.dz || 0);
        this._directionOffset = (k.dd || 0);
        this._type = _arg_2;
        this._base = (k.base || '');
        this._items = new Map();

        if(k.items) for(const _local_4 of k.items) this._items.set(_local_4.id, _local_4.base);

        let _local_5 = '';

        if(this._base !== '') _local_5 = this.baseAsInt().toString();

        if(_arg_3)
        {
            this._action = new ActiveActionData(_arg_3.state, this.base);
            this._action.definition = _arg_3;
        }
    }

    public get items(): Map<string, string>
    {
        return this._items;
    }

    private baseAsInt(): number
    {
        let k = 0;
        let index = 0;

        while(index < this._base.length)
        {
            k = (k + this._base.charCodeAt(index));

            index++;
        }

        return k;
    }

    public get id(): string
    {
        return this._id;
    }

    public get animationFrame(): number
    {
        return this._animationFrame;
    }

    public get dx(): number
    {
        return this._dx;
    }

    public get dy(): number
    {
        return this._dy;
    }

    public get dz(): number
    {
        return this._dz;
    }

    public get dd(): number
    {
        return this._directionOffset;
    }

    public get type(): string
    {
        return this._type;
    }

    public get base(): string
    {
        return this._base;
    }

    public get action(): IActiveActionData
    {
        return this._action;
    }
}
