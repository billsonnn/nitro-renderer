import { IRoomObject } from '../object';

export interface IRoomRendererBase
{
    addObject(object: IRoomObject): void;
    removeObject(object: IRoomObject): void;
    dispose(): void;
    reset(): void;
    update(time: number, update?: boolean): void;
}
