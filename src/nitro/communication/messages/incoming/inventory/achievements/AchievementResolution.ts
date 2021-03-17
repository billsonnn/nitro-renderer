import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class AchievementResolution
{
    public static _Str_16945: number = 0;

    private _achievementId: number;
    private _level: number;
    private _badgeId: string;
    private _Str_8741: number;
    private _state: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._achievementId = wrapper.readInt();
        this._level         = wrapper.readInt();
        this._badgeId       = wrapper.readString();
        this._Str_8741      = wrapper.readInt();
        this._state         = wrapper.readInt();
    }

    public dispose(): void
    {
        this._achievementId = 0;
        this._level         = 0;
        this._badgeId       = '';
        this._Str_8741      = 0;
    }

    public get achievementId(): number
    {
        return this._achievementId;
    }

    public get level(): number
    {
        return this._level;
    }

    public get badgeId(): string
    {
        return this._badgeId;
    }

    public get _Str_20240(): number
    {
        return this._Str_8741;
    }

    public get enabled(): boolean
    {
        return (this._state === AchievementResolution._Str_16945);
    }

    public get state(): number
    {
        return this._state;
    }
}