import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { PopularRoomTagsData } from './PopularRoomTagsData';

export class PopularRoomTagsResultMessageParser implements IMessageParser
{
    private _data: PopularRoomTagsData;

    public flush(): boolean
    {
        this._data = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new PopularRoomTagsData(wrapper);

        return true;
    }

    public get data(): PopularRoomTagsData
    {
        return this._data;
    }
}
