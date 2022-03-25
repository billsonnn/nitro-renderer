import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { FavoriteMembershipUpdateMessageParser } from '../../../parser/room/engine/FavoriteMembershipUpdateMessageParser';

export class FavoriteMembershipUpdateMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FavoriteMembershipUpdateMessageParser);
    }

    public getParser(): FavoriteMembershipUpdateMessageParser
    {
        return this.parser as FavoriteMembershipUpdateMessageParser;
    }
}
