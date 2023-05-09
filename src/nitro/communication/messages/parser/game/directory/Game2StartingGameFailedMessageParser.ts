import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class Game2StartingGameFailedMessageParser implements IMessageParser
{
    public static readonly NOT_ENOUGH_PLAYERS: number = 1;
    public static readonly GAME_HAS_NO_OWNER: number = 2;

    private _reason: number;

    public flush(): boolean
    {
        this._reason = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._reason = wrapper.readInt();

        return true;
    }

    public get reason(): number
    {
        return this._reason;
    }
}
