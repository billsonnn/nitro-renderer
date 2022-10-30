import { IRoomGeometry } from '../../IRoomGeometry';
import { IRoomSpriteMouseEvent } from '../../IRoomSpriteMouseEvent';

export interface IRoomObjectMouseHandler
{
    mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void;
}
