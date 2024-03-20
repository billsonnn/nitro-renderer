import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { CfhChatlogData } from './CfhChatlogData';

export class CfhChatlogMessageParser implements IMessageParser
{
    private _data: CfhChatlogData;

    public flush(): boolean
    {
        this._data = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new CfhChatlogData(wrapper);

        return true;
    }

    public get data(): CfhChatlogData
    {
        return this._data;
    }
}
