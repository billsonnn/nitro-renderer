export interface IConnectionStateListener
{
    connectionInit(socketUrl: string): void;
}