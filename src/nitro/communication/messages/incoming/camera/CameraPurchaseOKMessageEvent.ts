import { IMessageEvent, MessageEvent } from '../../../../../core';
import { CameraPurchaseOKMessageParser } from '../../parser/camera/CameraPurchaseOKMessageParser';

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
