import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../events';
import { FurnitureWallAddParser } from '../../../../parser';

export class FurnitureWallAddEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureWallAddParser);
    }

    public getParser(): FurnitureWallAddParser
    {
        return this.parser as FurnitureWallAddParser;
    }
}
