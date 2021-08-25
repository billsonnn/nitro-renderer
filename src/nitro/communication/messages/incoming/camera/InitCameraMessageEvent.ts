import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { InitCameraMessageParser } from '../../parser/camera/InitCameraMessageParser';

export class InitCameraMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, InitCameraMessageParser);
    }

    public getParser(): InitCameraMessageParser
    {
        return this.parser as InitCameraMessageParser;
    }
}
