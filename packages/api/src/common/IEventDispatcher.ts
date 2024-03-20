import { INitroEvent } from './INitroEvent';

export interface IEventDispatcher
{
    dispose(): void;
    addEventListener<T extends INitroEvent>(type: string, callback: (event: T) => void): void;
    removeEventListener(type: string, callback: Function): void;
    removeAllListeners(): void;
    dispatchEvent<T extends INitroEvent>(event: T): boolean;
}
