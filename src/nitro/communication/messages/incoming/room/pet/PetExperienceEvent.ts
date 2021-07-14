import { IMessageEvent, MessageEvent } from '../../../../../../core/communication/messages';
import { PetExperienceParser } from '../../../parser';

export class PetExperienceEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetExperienceParser);
    }

    public getParser(): PetExperienceParser
    {
        return this.parser as PetExperienceParser;
    }
}
