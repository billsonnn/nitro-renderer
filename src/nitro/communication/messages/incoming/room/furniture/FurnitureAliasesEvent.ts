import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { FurnitureAliasesParser } from '../../../parser';

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
