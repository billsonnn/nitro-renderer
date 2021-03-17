import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { FurnitureStateParser } from '../../../parser/room/furniture/FurnitureStateParser';

export class FurnitureStateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureStateParser);
    }

    public getParser(): FurnitureStateParser
    {
        return this.parser as FurnitureStateParser;
    }
}