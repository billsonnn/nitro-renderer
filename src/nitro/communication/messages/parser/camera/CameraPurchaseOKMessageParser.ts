import { IMessageDataWrapper } from '../../../../../core';
import { IMessageParser } from './../../../../../core';

export class CameraPurchaseOKMessageParser implements IMessageParser
{
    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        return true;
    }
}
