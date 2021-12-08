import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
