import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { FloodControlParser } from '../../../../parser/room/unit/chat/FloodControlParser';

export class FloodControlEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FloodControlParser);
    }

    public getParser(): FloodControlParser
    {
        return this.parser as FloodControlParser;
    }
}
