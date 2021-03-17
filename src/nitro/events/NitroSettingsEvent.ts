import { NitroEvent } from '../../core/events/NitroEvent';

export class NitroSettingsEvent extends NitroEvent
{
    public static SETTINGS_UPDATED: string = 'NSE_SETTINGS_UPDATED';

    private _volumeSystem: number;
    private _volumeFurni: number;
    private _volumeTrax: number;
    private _oldChat: boolean;
    private _roomInvites: boolean;
    private _cameraFollow: boolean;
    private _flags: number;
    private _chatType: number;

    constructor(type: string)
    {
        super(type);
    }

    public get volumeSystem(): number
    {
        return this._volumeSystem;
    }

    public set volumeSystem(volume: number)
    {
        this._volumeSystem = volume;
    }

    public get volumeFurni(): number
    {
        return this._volumeFurni;
    }

    public set volumeFurni(volume: number)
    {
        this._volumeFurni = volume;
    }

    public get volumeTrax(): number
    {
        return this._volumeTrax;
    }

    public set volumeTrax(volume: number)
    {
        this._volumeTrax = volume;
    }

    public get oldChat(): boolean
    {
        return this._oldChat;
    }

    public set oldChat(value: boolean)
    {
        this._oldChat = value;
    }

    public get roomInvites(): boolean
    {
        return this._roomInvites;
    }

    public set roomInvites(value: boolean)
    {
        this._roomInvites = value;
    }

    public get cameraFollow(): boolean
    {
        return this._cameraFollow;
    }

    public set cameraFollow(value: boolean)
    {
        this._cameraFollow = value;
    }

    public get flags(): number
    {
        return this._flags;
    }

    public set flags(flags: number)
    {
        this._flags = flags;
    }

    public get chatType(): number
    {
        return this._chatType;
    }

    public set chatType(type: number)
    {
        this._chatType = type;
    }
}
