import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { NavigatorOpenRoomCreatorParser } from '../../parser';

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
