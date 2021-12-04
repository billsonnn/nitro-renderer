import { IMessageDataWrapper } from '../../../../../core';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { ScrKickbackData } from '../../incoming/user/ScrKickbackData';

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

    public get data():ScrKickbackData
    {
        return this._data;
    }
}
