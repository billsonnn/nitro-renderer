import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarFlatControlUpdateMessage extends ObjectStateUpdateMessage
{
    private _level: number;

    constructor(level: number = 0)
    {
        super();

        this._level = level;
    }

    public get level(): number
    {
        return this._level;
    }
}