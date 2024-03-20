import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class YoutubeDisplayVideoMessageParser implements IMessageParser
{
    private _furniId: number;
    private _videoId: string;
    private _startAtSeconds: number;
    private _endAtSeconds: number;
    private _state: number;

    flush(): boolean
    {
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._furniId = wrapper.readInt();
        this._videoId = wrapper.readString();
        this._startAtSeconds = wrapper.readInt();
        this._endAtSeconds = wrapper.readInt();
        this._state = wrapper.readInt();
        return true;
    }

    public get furniId(): number
    {
        return this._furniId;
    }

    public get videoId(): string
    {
        return this._videoId;
    }

    public get state(): number
    {
        return this._state;
    }

    public get startAtSeconds(): number
    {
        return this._startAtSeconds;
    }

    public get endAtSeconds(): number
    {
        return this._endAtSeconds;
    }
}
