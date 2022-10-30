import { IEventDispatcher } from '../common';
import { IMessageComposer } from './IMessageComposer';
import { IMessageConfiguration } from './IMessageConfiguration';
import { IMessageEvent } from './IMessageEvent';

export interface IConnection extends IEventDispatcher
{
    init(socketUrl: string): void;
    dispose(): void;
    onReady(): void;
    authenticated(): void;
    send(...composers: IMessageComposer<unknown[]>[]): void;
    processReceivedData(): void;
    registerMessages(configuration: IMessageConfiguration): void;
    addMessageEvent(event: IMessageEvent): void;
    removeMessageEvent(event: IMessageEvent): void;
    isAuthenticated: boolean;
    dataBuffer: ArrayBuffer;
}
