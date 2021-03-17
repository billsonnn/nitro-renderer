import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class CatalogGroupData
{
    private _id: number;
    private _title: string;
    private _badge: string;
    private _colorA: string;
    private _colorB: string;
    private _isOwner: boolean;
    private _ownerId: number;
    private _hasForum: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._id        = 0;
        this._title     = null;
        this._badge     = null;
        this._colorA    = null;
        this._colorB    = null;
        this._isOwner   = false;
        this._ownerId   = 0;
        this._hasForum  = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._id        = wrapper.readInt();
        this._title     = wrapper.readString();
        this._badge     = wrapper.readString();
        this._colorA    = wrapper.readString();
        this._colorB    = wrapper.readString();
        this._isOwner   = wrapper.readBoolean();
        this._ownerId   = wrapper.readInt();
        this._hasForum  = wrapper.readBoolean();

        return true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get title(): string
    {
        return this._title;
    }

    public get badge(): string
    {
        return this._badge;
    }

    public get colorA(): string
    {
        return this._colorA;
    }

    public get colorB(): string
    {
        return this._colorB;
    }

    public get isOwner(): boolean
    {
        return this._isOwner;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public get hasForum(): boolean
    {
        return this._hasForum;
    }
}
