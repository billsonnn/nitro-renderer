import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { NavigatorHomeRoomParser } from '../../parser/navigator/NavigatorHomeRoomParser';

export class NavigatorHomeRoomEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorHomeRoomParser);
    }

    public getParser(): NavigatorHomeRoomParser
    {
        return this.parser as NavigatorHomeRoomParser;
    }
}
