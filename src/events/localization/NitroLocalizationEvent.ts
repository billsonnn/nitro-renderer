import { NitroEvent } from '../core';

export class NitroLocalizationEvent extends NitroEvent
{
    public static LOADED: string = 'NLE_LOADED';
    public static FAILED: string = 'NLE_FAILED';

    constructor(type: string)
    {
        super(type);
    }
}
