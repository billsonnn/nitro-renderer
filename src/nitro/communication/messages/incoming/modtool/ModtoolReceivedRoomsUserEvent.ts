import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ModtoolRoomUsersParser } from '../../parser/modtool/ModtoolRoomUsersParser';

export class ModtoolReceivedRoomsUserEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModtoolRoomUsersParser);
    }

    public getParser(): ModtoolRoomUsersParser
    {
        return this.parser as ModtoolRoomUsersParser;
    }
}
