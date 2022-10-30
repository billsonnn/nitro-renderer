import { IConnection, IMessageEvent, INitroManager } from '../../api';
import { NitroCommunicationDemo } from './demo/NitroCommunicationDemo';

export interface INitroCommunicationManager extends INitroManager
{
    registerMessageEvent(event: IMessageEvent): IMessageEvent;
    removeMessageEvent(event: IMessageEvent): void;
    demo: NitroCommunicationDemo;
    connection: IConnection;
}
