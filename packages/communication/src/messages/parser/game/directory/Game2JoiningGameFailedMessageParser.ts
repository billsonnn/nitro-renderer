import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class Game2JoiningGameFailedMessageParser implements IMessageParser
{
    public static readonly KICKED: number = 1;
    public static readonly DUPLICATE_MACHINEID: number = 2;
    public static readonly INVITATION_REQUIRED: number = 3;
    public static readonly NO_SPACE_IN_TEAM: number = 4;
    public static readonly TEAM_NOT_FOUND: number = 5;
    public static readonly USER_HAS_ACTIVE_INSTANCE: number = 6;
    public static readonly USER_HAS_PENDING_INSTANCE_REQUEST: number = 7;
    public static readonly USER_HAS_NO_FREE_GAMES_LEFT: number = 8;

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
