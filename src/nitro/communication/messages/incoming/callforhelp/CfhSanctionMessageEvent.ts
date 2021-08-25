import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CfhSanctionMessageParser } from '../../parser/callforhelp/CfhSanctionMessageParser';

export class CfhSanctionMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CfhSanctionMessageParser);
    }

    public getParser(): CfhSanctionMessageParser
    {
        return this.parser as CfhSanctionMessageParser;
    }
}
