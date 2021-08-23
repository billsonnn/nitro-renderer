import { IMessageEvent, MessageEvent } from '../../../../../core';
import { ThumbnailStatusMessageParser } from '../../parser/camera/ThumbnailStatusMessageParser';

export class ThumbnailStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ThumbnailStatusMessageParser);
    }

    public getParser(): ThumbnailStatusMessageParser
    {
        return this.parser as ThumbnailStatusMessageParser;
    }
}
