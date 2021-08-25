import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ThumbnailStatusMessageParser } from '../../parser/camera/ThumbnailStatusMessageParser';

export class ThumbnailStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ThumbnailStatusMessageParser);
    }

    public getParser(): ThumbnailStatusMessageParser
    {
        return this.parser as ThumbnailStatusMessageParser;
    }
}
