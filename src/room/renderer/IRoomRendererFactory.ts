import { IRoomRenderer } from './IRoomRenderer';

export interface IRoomRendererFactory
{
    createRenderer(): IRoomRenderer;
}