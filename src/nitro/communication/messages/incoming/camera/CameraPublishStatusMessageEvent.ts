import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CameraPublishStatusMessageParser } from '../../parser/camera/CameraPublishStatusMessageParser';

export class CameraPublishStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CameraPublishStatusMessageParser);
    }

    public getParser(): CameraPublishStatusMessageParser
    {
        return this.parser as CameraPublishStatusMessageParser;
    }
}
