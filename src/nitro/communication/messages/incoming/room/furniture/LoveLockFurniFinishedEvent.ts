import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
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
