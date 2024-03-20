import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { FurnitureWallDataParser } from './FurnitureWallDataParser';

export class FurnitureWallUpdateParser implements IMessageParser
{
    private _item: FurnitureWallDataParser;

    public flush(): boolean
    {
        this._item = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._item = new FurnitureWallDataParser(wrapper);

        return true;
    }

    public get item(): FurnitureWallDataParser
    {
        return this._item;
    }
}
