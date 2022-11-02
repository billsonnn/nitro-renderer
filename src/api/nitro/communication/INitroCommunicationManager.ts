import { INitroManager } from '../../common';
import { IConnection, IMessageEvent } from '../../communication';
import { INitroCommunicationDemo } from './INitroCommunicationDemo';

export interface INitroCommunicationManager extends INitroManager
{
    registerMessageEvent(event: IMessageEvent): IMessageEvent;
    removeMessageEvent(event: IMessageEvent): void;
    demo: INitroCommunicationDemo;
    connection: IConnection;
}
