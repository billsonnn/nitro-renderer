import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../events';
import { FurnitureFloorRemoveParser } from '../../../../parser';

export class FurnitureFloorRemoveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureFloorRemoveParser);
    }

    public getParser(): FurnitureFloorRemoveParser
    {
        return this.parser as FurnitureFloorRemoveParser;
    }
}
