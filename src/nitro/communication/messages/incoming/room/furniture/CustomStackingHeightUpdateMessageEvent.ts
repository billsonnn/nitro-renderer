import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { CustomStackingHeightUpdateMessageParser } from '../../../parser';

export class CustomStackingHeightUpdateMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CustomStackingHeightUpdateMessageParser);
    }

    public getParser(): CustomStackingHeightUpdateMessageParser
    {
        return this.parser as CustomStackingHeightUpdateMessageParser;
    }
}
