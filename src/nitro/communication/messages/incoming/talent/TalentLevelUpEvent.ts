import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { TalentLevelUpMessageParser } from '../../parser';

export class TalentLevelUpEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TalentLevelUpMessageParser);
    }

    public getParser(): TalentLevelUpMessageParser
    {
        return this.parser as TalentLevelUpMessageParser;
    }
}
