import { NitroEvent } from '@nitrots/events';

export class NotifyPlayedSongEvent extends NitroEvent
{
    public static readonly NOTIFY_PLAYED_SONG = 'UIEW_NOTIFY_PLAYED_SONG';

    private _name: string;
    private _creator: string;

    constructor(name:string, creator:string)
    {
        super(NotifyPlayedSongEvent.NOTIFY_PLAYED_SONG);

        this._name = name;
        this._creator = creator;
    }

    public get name(): string
    {
        return this._name;
    }

    public get creator(): string
    {
        return this._creator;
    }
}
