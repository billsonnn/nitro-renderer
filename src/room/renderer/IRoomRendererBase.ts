import { IRoomObject } from '../object/IRoomObject';

export interface IRoomRendererBase
{
    addObject(object: IRoomObject): void;
    removeObject(object: IRoomObject): void;
    dispose(): void;
    reset(): void;
    update(time: number, update?: boolean): void;
}