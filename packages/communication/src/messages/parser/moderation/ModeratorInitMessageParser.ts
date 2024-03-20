import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { ModeratorInitData } from './ModeratorInitData';

export class ModeratorInitMessageParser implements IMessageParser
{
    private _data: ModeratorInitData = null;
    public flush(): boolean
    {
        this._data = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._data = new ModeratorInitData(wrapper);
        return true;
    }

    public get data(): ModeratorInitData
    {
        return this._data;
    }
}
