import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RequestSpamWallPostItMessageParser } from '../../../parser/room/furniture/RequestSpamWallPostItMessageParser';

export class RequestSpamWallPostItMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RequestSpamWallPostItMessageParser);
    }

    public getParser(): RequestSpamWallPostItMessageParser
    {
        return this.parser as RequestSpamWallPostItMessageParser;
    }
}
