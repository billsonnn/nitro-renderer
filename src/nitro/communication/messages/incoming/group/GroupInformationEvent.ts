import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GroupInformationParser } from '../../parser';

export class GroupInformationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupInformationParser);
    }

    public getParser(): GroupInformationParser
    {
        return this.parser as GroupInformationParser;
    }
}
