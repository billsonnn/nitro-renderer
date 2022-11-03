import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CraftableProductsMessageParser } from '../../parser';

export class CraftableProductsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CraftableProductsMessageParser);
    }

    public getParser(): CraftableProductsMessageParser
    {
        return this.parser as CraftableProductsMessageParser;
    }
}
