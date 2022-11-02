import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { NavigatorSearchResultSet } from './utils';

export class NavigatorSearchParser implements IMessageParser
{
    private _result: NavigatorSearchResultSet;

    public flush(): boolean
    {
        this._result = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._result = new NavigatorSearchResultSet(wrapper);

        return true;
    }

    public get result(): NavigatorSearchResultSet
    {
        return this._result;
    }
}
