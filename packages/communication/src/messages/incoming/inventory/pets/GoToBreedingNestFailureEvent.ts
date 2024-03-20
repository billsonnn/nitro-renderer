import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { GoToBreedingNestFailureParser } from '../../../parser';

export class GoToBreedingNestFailureEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GoToBreedingNestFailureParser);
    }

    public getParser(): GoToBreedingNestFailureParser
    {
        return this.parser as GoToBreedingNestFailureParser;
    }
}
