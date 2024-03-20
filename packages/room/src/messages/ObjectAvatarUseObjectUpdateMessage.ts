import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarUseObjectUpdateMessage extends ObjectStateUpdateMessage
{
    private _itemType: number;

    constructor(itemType: number)
    {
        super();

        this._itemType = itemType;
    }

    public get itemType(): number
    {
        return this._itemType;
    }
}