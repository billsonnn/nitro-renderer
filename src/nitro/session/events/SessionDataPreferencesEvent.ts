import { NitroEvent } from '../../../core/events/NitroEvent';

export class SessionDataPreferencesEvent extends NitroEvent
{
    public static APUE_UPDATED: string = 'APUE_UPDATED';

    private _uiFlags: number;

    constructor(k: number)
    {
        super(SessionDataPreferencesEvent.APUE_UPDATED);

        this._uiFlags = k;
    }

    public get _Str_8444(): number
    {
        return this._uiFlags;
    }
}