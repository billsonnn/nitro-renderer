import { IConnection } from './IConnection';
import { IMessageParser } from './IMessageParser';

export interface IMessageEvent
{
    dispose(): void;
    callBack: Function;
    parserClass: Function;
    parser: IMessageParser;
    connection: IConnection;
}
