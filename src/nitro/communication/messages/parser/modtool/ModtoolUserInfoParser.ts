import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { ModtoolUserChatlogParserVisit } from './utils/ModtoolUserChatlogParserVisit';
import { ModtoolUserChatlogParserChatlog } from './utils/ModtoolUserChatlogParserChatlog';
import { _Str_5467 } from './utils/_Str_5467';

export class ModtoolUserInfoParser implements IMessageParser
{
    private _data: _Str_5467;

    public flush(): boolean
    {
        this._data = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._data = new _Str_5467(wrapper);

        return true;
    }

    public get data(): _Str_5467
    {
        return this._data;
    }



}
