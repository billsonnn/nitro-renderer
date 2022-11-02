import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../core';
import { FurnitureFloorAddParser } from '../../../../parser';

export class FurnitureFloorAddEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureFloorAddParser);
    }

    public getParser(): FurnitureFloorAddParser
    {
        return this.parser as FurnitureFloorAddParser;
    }
}
