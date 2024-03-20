import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class BotCommandConfigurationParser implements IMessageParser
{
    private _botId: number;
    private _commandId: number;
    private _data: string;

    public flush(): boolean
    {
        this._botId = -1;
        this._commandId = -1;
        this._data = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._botId = wrapper.readInt();
        this._commandId = wrapper.readInt();
        this._data = wrapper.readString();

        return true;
    }

    public get botId(): number
    {
        return this._botId;
    }
    public get commandId(): number
    {
        return this._commandId;
    }

    public get data(): string
    {
        return this._data;
    }
}
