import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
