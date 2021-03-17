import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { UserFigureParser } from '../../../parser/user/data/UserFigureParser';

export class UserFigureEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserFigureParser);
    }

    public getParser(): UserFigureParser
    {
        return this.parser as UserFigureParser;
    }
}