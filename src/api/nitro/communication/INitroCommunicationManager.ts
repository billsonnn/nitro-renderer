import { INitroManager } from '../../common';
import { IConnection } from './IConnection';
import { IMessageEvent } from './IMessageEvent';
import { INitroCommunicationDemo } from './INitroCommunicationDemo';

export interface INitroCommunicationManager extends INitroManager
{
    registerMessageEvent(event: IMessageEvent): IMessageEvent;
    removeMessageEvent(event: IMessageEvent): void;
    demo: INitroCommunicationDemo;
    connection: IConnection;
}
