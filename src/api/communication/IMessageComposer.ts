export interface IMessageComposer<T extends unknown[]>
{
    dispose(): void;
    getMessageArray(): T;
}