import { IMessageEvent } from '../../core';
import { INitroManager } from '../../core/common/INitroManager';
import { IConnection } from '../../core/communication/connections/IConnection';
import { NitroCommunicationDemo } from './demo/NitroCommunicationDemo';

export interface INitroCommunicationManager extends INitroManager
{
    registerMessageEvent(event: IMessageEvent): IMessageEvent;
    removeMessageEvent(event: IMessageEvent): void;
    demo: NitroCommunicationDemo;
    connection: IConnection;
}
