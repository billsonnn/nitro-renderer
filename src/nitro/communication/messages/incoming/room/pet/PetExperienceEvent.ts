import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
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
