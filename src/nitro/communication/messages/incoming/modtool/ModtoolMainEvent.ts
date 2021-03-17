import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ModtoolRoomChatlogParser } from '../../parser/modtool/ModtoolRoomChatlogParser';
import { ModtoolMainParser } from '../../parser/modtool/ModtoolMainParser';

export class ModtoolMainEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModtoolMainParser);
    }

    public getParser(): ModtoolMainParser
    {
        return this.parser as ModtoolMainParser;
    }
}
