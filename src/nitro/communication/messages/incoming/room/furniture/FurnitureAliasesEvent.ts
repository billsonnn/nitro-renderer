import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { FurnitureAliasesParser } from '../../../parser/room/furniture/FurnitureAliasesParser';

export class FurnitureAliasesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureAliasesParser);
    }

    public getParser(): FurnitureAliasesParser
    {
        return this.parser as FurnitureAliasesParser;
    }
}