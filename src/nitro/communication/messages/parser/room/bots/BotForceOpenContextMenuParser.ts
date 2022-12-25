import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class BotForceOpenContextMenuParser implements IMessageParser
{
    private _botId: number;

    public flush(): boolean
    {
        this._botId = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._botId = wrapper.readInt();

        return true;
    }

    public get botId(): number
    {
        return this._botId;
    }
}
