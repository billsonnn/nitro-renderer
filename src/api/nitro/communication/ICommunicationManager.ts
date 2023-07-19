import { IConnection } from './IConnection';
import { IMessageEvent } from './IMessageEvent';

export interface ICommunicationManager
{
    init(): Promise<void>;
    registerMessageEvent(event: IMessageEvent): IMessageEvent;
    removeMessageEvent(event: IMessageEvent): void;
    connection: IConnection;
}
