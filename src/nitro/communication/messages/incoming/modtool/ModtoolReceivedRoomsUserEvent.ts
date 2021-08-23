import { IMessageEvent, MessageEvent } from '../../../../../core';
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
