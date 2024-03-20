import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class YoutubeControlVideoMessageParser implements IMessageParser
{
    private _furniId: number;
    private _commandId: number;

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._furniId = wrapper.readInt();
        this._commandId = wrapper.readInt();
        return true;
    }

    public flush(): boolean
    {
        this._furniId = -1;
        this._commandId = -1;
        return true;
    }

    public get furniId(): number
    {
        return this._furniId;
    }

    public get commandId(): number
    {
        return this._commandId;
    }
}
