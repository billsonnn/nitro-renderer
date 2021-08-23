import { IMessageEvent, MessageEvent } from '../../../../../core';
import { GroupInformationParser } from '../../parser/group/GroupInformationParser';

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
