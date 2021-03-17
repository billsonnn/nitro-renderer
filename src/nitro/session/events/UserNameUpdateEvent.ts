import { NitroEvent } from '../../../core/events/NitroEvent';

export class UserNameUpdateEvent extends NitroEvent
{
    public static UNUE_NAME_UPDATED: string = 'unue_name_updated';

    private _name: string;

    constructor(k: string)
    {
        super(UserNameUpdateEvent.UNUE_NAME_UPDATED);

        this._name = k;
    }

    public get name(): string
    {
        return this._name;
    }
}