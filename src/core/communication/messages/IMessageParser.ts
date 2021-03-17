import { IMessageDataWrapper } from './IMessageDataWrapper';

export interface IMessageParser
{
    flush(): boolean;
    parse(wrapper: IMessageDataWrapper): boolean;
}