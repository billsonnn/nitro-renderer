import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GroupFurniContextMenuInfoMessageParser implements IMessageParser
{
    private _objectId: number;
    private _guildId: number;
    private _guildName: string;
    private _guildHomeRoomId: number;
    private _userIsMember: boolean;
    private _guildHasReadableForum: boolean;

    public flush(): boolean
    {
        this._objectId = 0;
        this._guildId = 0;
        this._guildName = null;
        this._guildHomeRoomId = 0;
        this._userIsMember = false;
        this._guildHasReadableForum = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._objectId = wrapper.readInt();
        this._guildId = wrapper.readInt();
        this._guildName = wrapper.readString();
        this._guildHomeRoomId = wrapper.readInt();
        this._userIsMember = wrapper.readBoolean();
        this._guildHasReadableForum = wrapper.readBoolean();

        return true;
    }

    public get objectId(): number
    {
        return this._objectId;
    }

    public get guildId(): number
    {
        return this._guildId;
    }

    public get guildName(): string
    {
        return this._guildName;
    }

    public get guildHomeRoomId(): number
    {
        return this._guildHomeRoomId;
    }

    public get userIsMember(): boolean
    {
        return this._userIsMember;
    }

    public get guildHasReadableForum(): boolean
    {
        return this._guildHasReadableForum;
    }
}
