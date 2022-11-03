import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CameraPurchaseOKMessageParser } from '../../parser';

export class CameraPurchaseOKMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CameraPurchaseOKMessageParser);
    }

    public getParser(): CameraPurchaseOKMessageParser
    {
        return this.parser as CameraPurchaseOKMessageParser;
    }
}
