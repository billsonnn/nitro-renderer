import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { FurnitureDataParser } from '../../../parser';

export class FurnitureDataEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureDataParser);
    }

    public getParser(): FurnitureDataParser
    {
        return this.parser as FurnitureDataParser;
    }
}
