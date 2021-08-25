import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { LoveLockFurniFriendConfirmedParser } from '../../../parser/room/furniture/LoveLockFurniFriendConfirmedParser';

export class LoveLockFurniFriendConfirmedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, LoveLockFurniFriendConfirmedParser);
    }

    public getParser(): LoveLockFurniFriendConfirmedParser
    {
        return this.parser as LoveLockFurniFriendConfirmedParser;
    }
}
