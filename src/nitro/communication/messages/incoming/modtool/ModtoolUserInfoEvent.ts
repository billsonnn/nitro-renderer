import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ModtoolUserInfoParser } from '../../parser/modtool/ModtoolUserInfoParser';

export class ModtoolUserInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModtoolUserInfoParser);
    }

    public getParser(): ModtoolUserInfoParser
    {
        return this.parser as ModtoolUserInfoParser;
    }
}
