import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { FurnitureStackHeightParser } from '../../../parser';

export class FurnitureStackHeightEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureStackHeightParser);
    }

    public getParser(): FurnitureStackHeightParser
    {
        return this.parser as FurnitureStackHeightParser;
    }
}
