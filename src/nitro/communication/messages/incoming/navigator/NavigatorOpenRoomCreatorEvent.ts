import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { NavigatorOpenRoomCreatorParser } from '../../parser/navigator/NavigatorOpenRoomCreatorParser';

export class NavigatorOpenRoomCreatorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorOpenRoomCreatorParser);
    }

    public getParser(): NavigatorOpenRoomCreatorParser
    {
        return this.parser as NavigatorOpenRoomCreatorParser;
    }
}
