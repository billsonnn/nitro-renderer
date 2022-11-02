import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class FavoriteMembershipUpdateMessageParser implements IMessageParser
{
    private _roomIndex: number;
    private _groupId: number;
    private _status: number;
    private _groupName: string;

    public flush(): boolean
    {
        this._roomIndex = -1;
        this._groupId = -1;
        this._status = 0;
        this._groupName = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomIndex = wrapper.readInt();
        this._groupId = wrapper.readInt();
        this._status = wrapper.readInt();
        this._groupName = wrapper.readString();

        return true;
    }

    public get roomIndex(): number
    {
        return this._roomIndex;
    }

    public get groupId(): number
    {
        return this._groupId;
    }

    public get status(): number
    {
        return this._status;
    }

    public get groupName(): string
    {
        return this._groupName;
    }
}
