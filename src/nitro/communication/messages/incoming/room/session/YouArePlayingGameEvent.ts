import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { YouArePlayingGameParser } from '../../../parser/room/session/YouArePlayingGameParser';

export class YouArePlayingGameEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, YouArePlayingGameParser);
    }

    public getParser(): YouArePlayingGameParser
    {
        return this.parser as YouArePlayingGameParser;
    }
}
