import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { WiredRewardResultMessageParser } from '../../parser';

export class WiredRewardResultMessageEvent extends MessageEvent implements IMessageEvent
{
    public static PRODUCT_DONATED_CODE: number = 6;
    public static BADGE_DONATED_CODE: number = 7;

    constructor(callBack: Function)
    {
        super(callBack, WiredRewardResultMessageParser);
    }

    public getParser(): WiredRewardResultMessageParser
    {
        return this.parser as WiredRewardResultMessageParser;
    }
}
