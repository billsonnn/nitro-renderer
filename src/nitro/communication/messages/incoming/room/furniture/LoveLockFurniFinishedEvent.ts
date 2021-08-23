import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { LoveLockFurniFinishedParser } from '../../../parser/room/furniture/LoveLockFurniFinishedParser';

export class LoveLockFurniFinishedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, LoveLockFurniFinishedParser);
    }

    public getParser(): LoveLockFurniFinishedParser
    {
        return this.parser as LoveLockFurniFinishedParser;
    }
}
