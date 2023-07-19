import { IMessageComposer } from './IMessageComposer';
import { IMessageConfiguration } from './IMessageConfiguration';
import { IMessageEvent } from './IMessageEvent';

export interface IConnection
{
    init(socketUrl: string): void;
    ready(): void;
    authenticated(): void;
    send(...composers: IMessageComposer<unknown[]>[]): void;
    processReceivedData(): void;
    registerMessages(configuration: IMessageConfiguration): void;
    addMessageEvent(event: IMessageEvent): void;
    removeMessageEvent(event: IMessageEvent): void;
    isAuthenticated: boolean;
    dataBuffer: ArrayBuffer;
}
