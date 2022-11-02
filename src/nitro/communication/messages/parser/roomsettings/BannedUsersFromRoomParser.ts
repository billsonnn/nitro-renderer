import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { BannedUserData } from './BannedUserData';

export class BannedUsersFromRoomParser implements IMessageParser
{
    private _roomId: number;
    private _bannedUsers: BannedUserData[];

    public flush(): boolean
    {
        this._roomId = 0;
        this._bannedUsers = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId = wrapper.readInt();

        let totalBans = wrapper.readInt();

        while(totalBans > 0)
        {
            this._bannedUsers.push(new BannedUserData(wrapper));

            totalBans--;
        }

        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get bannedUsers(): BannedUserData[]
    {
        return this._bannedUsers;
    }
}
