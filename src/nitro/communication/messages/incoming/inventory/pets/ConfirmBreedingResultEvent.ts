import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { ConfirmBreedingResultParser } from '../../../parser';

export class ConfirmBreedingResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ConfirmBreedingResultParser);
    }

    public getParser(): ConfirmBreedingResultParser
    {
        return this.parser as ConfirmBreedingResultParser;
    }
}
