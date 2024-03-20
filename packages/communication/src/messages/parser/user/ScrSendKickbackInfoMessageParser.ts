import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { ScrKickbackData } from './ScrKickbackData';

export class ScrSendKickbackInfoMessageParser implements IMessageParser
{
    private _data: ScrKickbackData;

    flush(): boolean
    {
        this._data = null;
        return true;
    }
    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._data = new ScrKickbackData(wrapper);
        return true;
    }

    public get data(): ScrKickbackData
    {
        return this._data;
    }
}
