import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarSelectedMessage extends ObjectStateUpdateMessage
{
    private _selected: boolean;

    constructor(selected: boolean)
    {
        super();

        this._selected = selected;
    }

    public get selected(): boolean
    {
        return this._selected;
    }
}