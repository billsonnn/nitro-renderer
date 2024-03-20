import { IMessageDataWrapper } from '@nitrots/api';

export class NavigatorEventCategoryDataParser
{
    private _id: number;
    private _name: string;
    private _visible: boolean;

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

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._id = wrapper.readInt();
        this._name = wrapper.readString();
        this._visible = wrapper.readBoolean();

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
}
