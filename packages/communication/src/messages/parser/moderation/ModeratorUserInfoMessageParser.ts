import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { ModeratorUserInfoData } from './ModeratorUserInfoData';

export class ModeratorUserInfoMessageParser implements IMessageParser
{
    private _data: ModeratorUserInfoData;

    public flush(): boolean
    {
        this._data = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new ModeratorUserInfoData(wrapper);

        return true;
    }

    public get data(): ModeratorUserInfoData
    {
        return this._data;
    }
}
