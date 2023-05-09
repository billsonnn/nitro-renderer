import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { ChangeEmailResultParser } from '../../parser';

export class ChangeEmailResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ChangeEmailResultParser);
    }

    public getParser(): ChangeEmailResultParser
    {
        return this.parser as ChangeEmailResultParser;
    }
}
