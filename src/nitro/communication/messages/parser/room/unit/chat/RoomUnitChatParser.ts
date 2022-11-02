import { IMessageDataWrapper, IMessageParser } from '../../../../../../../api';

export class RoomUnitChatParser implements IMessageParser
{
    private _roomIndex: number;
    private _message: string;
    private _gesture: number;
    private _bubble: number;
    private _urls: string[];
    private _messageLength: number;

    public flush(): boolean
    {
        this._roomIndex = null;
        this._message = null;
        this._gesture = 0;
        this._bubble = 0;
        this._urls = [];
        this._messageLength = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomIndex = wrapper.readInt();
        this._message = wrapper.readString();
        this._gesture = wrapper.readInt();
        this._bubble = wrapper.readInt();

        this.parseUrls(wrapper);

        this._messageLength = wrapper.readInt();

        return true;
    }

    private parseUrls(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._urls = [];

        let totalUrls = wrapper.readInt();

        while(totalUrls > 0)
        {
            this._urls.push(wrapper.readString());

            totalUrls--;
        }

        return true;
    }

    public get roomIndex(): number
    {
        return this._roomIndex;
    }

    public get message(): string
    {
        return this._message;
    }

    public get gesture(): number
    {
        return this._gesture;
    }

    public get bubble(): number
    {
        return this._bubble;
    }

    public get urls(): string[]
    {
        return this._urls;
    }

    public get messageLength(): number
    {
        return this._messageLength;
    }
}
