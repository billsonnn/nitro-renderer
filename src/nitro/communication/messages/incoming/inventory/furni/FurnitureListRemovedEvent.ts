import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { FurnitureListRemovedParser } from '../../../parser';

export class FurnitureListRemovedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureListRemovedParser);
    }

    public getParser(): FurnitureListRemovedParser
    {
        return this.parser as FurnitureListRemovedParser;
    }
}
