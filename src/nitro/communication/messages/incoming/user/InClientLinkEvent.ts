import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { InClientLinkParser } from '../../parser/user/InClientLinkParser';

export class InClientLinkEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, InClientLinkParser);
    }

    public getParser(): InClientLinkParser
    {
        return this.parser as InClientLinkParser;
    }
}
