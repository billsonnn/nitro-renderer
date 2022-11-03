import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { PetLevelNotificationParser } from '../../parser';

export class PetLevelNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetLevelNotificationParser);
    }

    public getParser(): PetLevelNotificationParser
    {
        return this.parser as PetLevelNotificationParser;
    }
}
