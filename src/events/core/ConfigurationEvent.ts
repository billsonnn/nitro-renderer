import { NitroEvent } from './NitroEvent';

export class ConfigurationEvent extends NitroEvent
{
    public static LOADED: string = 'NCE_LOADED';
    public static FAILED: string = 'NCE_FAILED';

    constructor(type: string)
    {
        super(type);
    }
}
