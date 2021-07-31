import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from './../../../../../core/communication/messages/IMessageParser';

export class CameraPurchaseOKMessageParser implements IMessageParser
{
    public flush():boolean
    {
        return true;
    }

    public parse(k:IMessageDataWrapper):boolean
    {
        return true;
    }
}
