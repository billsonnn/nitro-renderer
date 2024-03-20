import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class FurnitureListRemovedParser implements IMessageParser
{
    private _itemId: number;

    public flush(): boolean
    {
        this._itemId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId = wrapper.readInt();

        return true;
    }

    public get itemId(): number
    {
        return this._itemId;
    }
}
