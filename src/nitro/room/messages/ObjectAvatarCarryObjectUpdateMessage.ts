import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarCarryObjectUpdateMessage extends ObjectStateUpdateMessage
{
    private _itemType: number;
    private _itemName: string;

    constructor(itemType: number, itemName: string)
    {
        super();

        this._itemType = itemType;
        this._itemName = itemName;
    }

    public get itemType(): number
    {
        return this._itemType;
    }

    public get itemName(): string
    {
        return this._itemName;
    }
}