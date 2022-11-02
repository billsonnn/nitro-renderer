import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { CameraStorageUrlMessageParser } from '../../parser';

export class CameraStorageUrlMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CameraStorageUrlMessageParser);
    }

    public getParser(): CameraStorageUrlMessageParser
    {
        return this.parser as CameraStorageUrlMessageParser;
    }
}
