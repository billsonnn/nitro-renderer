import { NitroEvent } from '../core';

export class UserNameUpdateEvent extends NitroEvent
{
    public static UNUE_NAME_UPDATED: string = 'unue_name_updated';

    private _name: string;

    constructor(name: string)
    {
        super(UserNameUpdateEvent.UNUE_NAME_UPDATED);

        this._name = name;
    }

    public get name(): string
    {
        return this._name;
    }
}
