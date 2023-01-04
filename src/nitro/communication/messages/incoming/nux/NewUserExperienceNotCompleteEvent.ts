import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { NewUserExperienceNotCompleteParser } from '../../parser/nux';

export class NewUserExperienceNotCompleteEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NewUserExperienceNotCompleteParser);
    }

    public getParser(): NewUserExperienceNotCompleteParser
    {
        return this.parser as NewUserExperienceNotCompleteParser;
    }
}
