import { IRoomRenderer } from './IRoomRenderer';
import { IRoomRendererFactory } from './IRoomRendererFactory';
import { RoomRenderer } from './RoomRenderer';

export class RoomRendererFactory implements IRoomRendererFactory
{
    public createRenderer(): IRoomRenderer
    {
        return new RoomRenderer();
    }
}