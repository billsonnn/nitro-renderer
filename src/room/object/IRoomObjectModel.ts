export interface IRoomObjectModel
{
    dispose(): void;
    getValue<T>(key: string): T;
    setValue<T>(key: string, value: T): void;
    removeKey(key: string): void;
    updateCounter: number;
}