import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { WiredFurniTriggerParser } from '../../parser';

export class WiredFurniTriggerEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredFurniTriggerParser);
    }

    public getParser(): WiredFurniTriggerParser
    {
        return this.parser as WiredFurniTriggerParser;
    }
}
