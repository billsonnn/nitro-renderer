import { INitroEvent } from '../../api';

export class NitroEvent implements INitroEvent
{
    private _type: string;

    constructor(type: string)
    {
        this._type = type;
    }

    public get type(): string
    {
        return this._type;
    }
}
