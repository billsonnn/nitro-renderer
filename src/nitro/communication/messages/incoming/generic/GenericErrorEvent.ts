import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GenericErrorParser } from '../../parser';

export class GenericErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GenericErrorParser);
    }

    public getParser(): GenericErrorParser
    {
        return this.parser as GenericErrorParser;
    }
}
