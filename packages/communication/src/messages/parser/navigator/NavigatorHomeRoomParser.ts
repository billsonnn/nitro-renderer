import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class NavigatorHomeRoomParser implements IMessageParser
{
    private _homeRoomId: number;
    private _roomIdToEnter: number;

    public flush(): boolean
    {
        this._homeRoomId = -1;
        this._roomIdToEnter = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._homeRoomId = wrapper.readInt();
        this._roomIdToEnter = wrapper.readInt();

        return true;
    }

    public get homeRoomId(): number
    {
        return this._homeRoomId;
    }

    public get roomIdToEnter(): number
    {
        return this._roomIdToEnter;
    }
}
