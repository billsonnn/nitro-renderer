import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { FurnitureListAddOrUpdateParser } from '../../../parser';

export class FurnitureListAddOrUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureListAddOrUpdateParser);
    }

    public getParser(): FurnitureListAddOrUpdateParser
    {
        return this.parser as FurnitureListAddOrUpdateParser;
    }
}
