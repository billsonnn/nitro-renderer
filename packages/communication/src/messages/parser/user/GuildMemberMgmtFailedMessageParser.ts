import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GuildMemberMgmtFailedMessageParser implements IMessageParser
{
    private _guildId: number;
    private _reason: number;

    public flush(): boolean
    {
        this._guildId = -1;
        this._reason = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._guildId = wrapper.readInt();
        this._reason = wrapper.readInt();

        return true;
    }

    public get guildId(): number
    {
        return this._guildId;
    }

    public get reason(): number
    {
        return this._reason;
    }
}
