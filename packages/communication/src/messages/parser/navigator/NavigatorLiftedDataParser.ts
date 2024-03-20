import { IMessageDataWrapper } from '@nitrots/api';

export class NavigatorLiftedDataParser
{
    private _roomId: number;
    private _areaId: number;
    private _image: string;
    private _caption: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._roomId = -1;
        this._areaId = -1;
        this._image = null;
        this._caption = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId = wrapper.readInt();
        this._areaId = wrapper.readInt();
        this._image = wrapper.readString();
        this._caption = wrapper.readString();

        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get areaId(): number
    {
        return this._areaId;
    }

    public get image(): string
    {
        return this._image;
    }

    public get caption(): string
    {
        return this._caption;
    }
}
