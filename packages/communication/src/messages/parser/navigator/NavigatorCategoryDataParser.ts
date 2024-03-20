import { IMessageDataWrapper } from '@nitrots/api';

export class NavigatorCategoryDataParser
{
    private _id: number;
    private _name: string;
    private _visible: boolean;
    private _automatic: boolean;
    private _automaticCategoryKey: string;
    private _globalCategoryKey: string;
    private _staffOnly: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._id = -1;
        this._name = null;
        this._visible = false;
        this._automatic = false;
        this._automaticCategoryKey = null;
        this._globalCategoryKey = null;
        this._staffOnly = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._id = wrapper.readInt();
        this._name = wrapper.readString();
        this._visible = wrapper.readBoolean();
        this._automatic = wrapper.readBoolean();
        this._automaticCategoryKey = wrapper.readString();
        this._globalCategoryKey = wrapper.readString();
        this._staffOnly = wrapper.readBoolean();

        return true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get name(): string
    {
        return this._name;
    }

    public get visible(): boolean
    {
        return this._visible;
    }

    public get automatic(): boolean
    {
        return this._automatic;
    }

    public get automaticCategoryKey(): string
    {
        return this._automaticCategoryKey;
    }

    public get globalCategoryKey(): string
    {
        return this._globalCategoryKey;
    }

    public get staffOnly(): boolean
    {
        return this._staffOnly;
    }
}
