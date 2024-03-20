import { IRoomGeometry } from '../IRoomGeometry';
import { IRoomSpriteMouseEvent } from '../IRoomSpriteMouseEvent';
import { IRoomObject } from '../object';

export interface IRoomCanvasMouseListener
{
    processRoomCanvasMouseEvent(event: IRoomSpriteMouseEvent, object: IRoomObject, geometry: IRoomGeometry): void
}
