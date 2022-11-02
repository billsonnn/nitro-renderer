import { IMessageDataWrapper } from '../../../../../api';

export class HabboSearchResultData
{
    private _avatarId: number;
    private _avatarName: string;
    private _avatarMotto: string;
    private _isAvatarOnline: boolean;
    private _canFollow: boolean;
    private _avatarGender: number;
    private _avatarFigure: string;
    private _lastOnlineData: string;
    private _realName: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this._avatarId = wrapper.readInt();
        this._avatarName = wrapper.readString();
        this._avatarMotto = wrapper.readString();
        this._isAvatarOnline = wrapper.readBoolean();
        this._canFollow = wrapper.readBoolean();

        this._lastOnlineData = wrapper.readString(); // this was not assigned to anything on original packet

        this._avatarGender = wrapper.readInt();
        this._avatarFigure = wrapper.readString();
        this._realName = wrapper.readString();
    }

    public get avatarId(): number
    {
        return this._avatarId;
    }

    public get avatarName(): string
    {
        return this._avatarName;
    }

    public get avatarMotto(): string
    {
        return this._avatarMotto;
    }

    public get isAvatarOnline(): boolean
    {
        return this._isAvatarOnline;
    }

    public get canFollow(): boolean
    {
        return this._canFollow;
    }

    public get avatarGender(): number
    {
        return this._avatarGender;
    }

    public get avatarFigure(): string
    {
        return this._avatarFigure;
    }

    public get lastOnlineData(): string
    {
        return this._lastOnlineData;
    }

    public get realName(): string
    {
        return this._realName;
    }
}
