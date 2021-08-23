import { IMessageEvent, MessageEvent } from '../../../../../core';
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
