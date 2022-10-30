export interface IWorkerEventTracker
{
    workerMessageReceived(message: { [index: string]: any }): void;
}
