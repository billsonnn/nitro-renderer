import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { PetTrainingMessageParser } from './../../parser';

export class PetTrainingPanelMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetTrainingMessageParser);
    }

    public getParser(): PetTrainingMessageParser
    {
        return this.parser as PetTrainingMessageParser;
    }
}
