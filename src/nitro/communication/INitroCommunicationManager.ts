import { INitroManager } from '../../core/common/INitroManager';
import { IConnection } from '../../core/communication/connections/IConnection';
import { IMessageEvent } from '../../core/communication/messages/IMessageEvent';
import { NitroCommunicationDemo } from './demo/NitroCommunicationDemo';

export interface INitroCommunicationManager extends INitroManager
{
    registerMessageEvent(event: IMessageEvent): IMessageEvent;
    removeMessageEvent(event: IMessageEvent): void;
    demo: NitroCommunicationDemo;
    connection: IConnection;
}