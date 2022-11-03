import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CfhSanctionMessageParser } from '../../parser';

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
