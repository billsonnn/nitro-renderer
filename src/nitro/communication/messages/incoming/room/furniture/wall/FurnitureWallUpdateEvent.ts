import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../events';
import { FurnitureWallUpdateParser } from '../../../../parser';

export class FurnitureWallUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureWallUpdateParser);
    }

    public getParser(): FurnitureWallUpdateParser
    {
        return this.parser as FurnitureWallUpdateParser;
    }
}
