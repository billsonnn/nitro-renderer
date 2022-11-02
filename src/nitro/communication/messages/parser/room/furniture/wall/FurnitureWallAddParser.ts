import { IMessageDataWrapper, IMessageParser } from '../../../../../../../api';
import { FurnitureWallDataParser } from './FurnitureWallDataParser';

export class FurnitureWallAddParser implements IMessageParser
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
        this._item.username = wrapper.readString();

        return true;
    }

    public get item(): FurnitureWallDataParser
    {
        return this._item;
    }
}
