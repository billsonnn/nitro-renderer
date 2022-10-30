import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../core';
import { FurnitureWallParser } from '../../../../parser/room/furniture/wall/FurnitureWallParser';

export class FurnitureWallEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureWallParser);
    }

    public getParser(): FurnitureWallParser
    {
        return this.parser as FurnitureWallParser;
    }
}
