import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { PetFigureUpdateParser } from '../../../parser';

export class PetFigureUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetFigureUpdateParser);
    }

    public getParser(): PetFigureUpdateParser
    {
        return this.parser as PetFigureUpdateParser;
    }
}
