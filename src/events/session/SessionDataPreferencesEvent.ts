import { NitroEvent } from '../core';

export class SessionDataPreferencesEvent extends NitroEvent
{
    public static UPDATED: string = 'APUE_UPDATED';

    private _uiFlags: number;

    constructor(k: number)
    {
        super(SessionDataPreferencesEvent.UPDATED);

        this._uiFlags = k;
    }

    public get uiFlags(): number
    {
        return this._uiFlags;
    }
}
