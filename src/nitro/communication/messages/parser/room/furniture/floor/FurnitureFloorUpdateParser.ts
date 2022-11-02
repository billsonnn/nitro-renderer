import { IMessageDataWrapper, IMessageParser } from '../../../../../../../api';
import { FurnitureFloorDataParser } from './FurnitureFloorDataParser';

export class FurnitureFloorUpdateParser implements IMessageParser
{
    private _item: FurnitureFloorDataParser;

    public flush(): boolean
    {
        this._item = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._item = new FurnitureFloorDataParser(wrapper);

        return true;
    }

    public get item(): FurnitureFloorDataParser
    {
        return this._item;
    }
}
