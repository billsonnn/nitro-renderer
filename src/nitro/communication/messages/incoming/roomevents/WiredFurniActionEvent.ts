import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { WiredFurniActionParser } from '../../parser';

export class WiredFurniActionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredFurniActionParser);
    }

    public getParser(): WiredFurniActionParser
    {
        return this.parser as WiredFurniActionParser;
    }
}
