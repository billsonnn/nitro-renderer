import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { NavigatorMetadataParser } from '../../parser/navigator/NavigatorMetadataParser';

export class NavigatorMetadataEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorMetadataParser);
    }

    public getParser(): NavigatorMetadataParser
    {
        return this.parser as NavigatorMetadataParser;
    }
}
