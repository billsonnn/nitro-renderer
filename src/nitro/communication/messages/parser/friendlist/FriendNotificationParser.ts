import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class FriendNotificationParser implements IMessageParser
{
    private _typeCode: number;
    private _avatarId: number;
    private _message: string;

    public flush(): boolean
    {
        this._typeCode = -1;
        this._avatarId = 0;
        this._message = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._typeCode = wrapper.readInt();
        this._avatarId = wrapper.readInt();
        this._message = wrapper.readString();

        return true;
    }

    public get typeCode(): number
    {
        return this._typeCode;
    }

    public get avatarId(): number
    {
        return this._avatarId;
    }

    public get message(): string
    {
        return this._message;
    }
}
