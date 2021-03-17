import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { CallForHelpCategoryData } from './utils/CallForHelpCategoryData';
import { _Str_5018 } from './utils/_Str_5018';

export class ModtoolMainParser  implements IMessageParser
{
    private _data: _Str_5018 = null;
    public flush(): boolean
    {
        this._data = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._data = new _Str_5018(wrapper);
        return true;
    }

    public get data(): _Str_5018
    {
        return this._data;
    }
}
