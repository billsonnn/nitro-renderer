import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { CategoriesWithVisitorCountData } from './utils/CategoriesWithVisitorCountData';

export class CategoriesWithVisitorCountParser implements IMessageParser
{
    private _data:CategoriesWithVisitorCountData;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new CategoriesWithVisitorCountData(wrapper);

        return true;
    }

    public get data():CategoriesWithVisitorCountData
    {
        return this._data;
    }
}
