import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { FireworkChargeDataParser } from '../../parser';

export class FireworkChargeDataEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FireworkChargeDataParser);
    }

    public getParser(): FireworkChargeDataParser
    {
        return this.parser as FireworkChargeDataParser;
    }
}
