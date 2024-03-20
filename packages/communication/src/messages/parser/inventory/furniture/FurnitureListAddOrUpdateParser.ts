import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { FurnitureListItemParser } from './FurnitureListItemParser';

export class FurnitureListAddOrUpdateParser implements IMessageParser
{
    private _items: FurnitureListItemParser[];

    public flush(): boolean
    {
        this._items = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._items.push(new FurnitureListItemParser(wrapper));

        return true;
    }

    public get items(): FurnitureListItemParser[]
    {
        return this._items;
    }
}
