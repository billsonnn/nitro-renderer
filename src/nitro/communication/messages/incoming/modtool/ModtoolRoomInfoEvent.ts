import { IMessageEvent, MessageEvent } from '../../../../../core';
import { ModtoolRoomInfoParser } from '../../parser/modtool/ModtoolRoomInfoParser';

export class ModtoolRoomInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModtoolRoomInfoParser);
    }

    public getParser(): ModtoolRoomInfoParser
    {
        return this.parser as ModtoolRoomInfoParser;
    }
}
