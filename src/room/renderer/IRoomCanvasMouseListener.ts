import { RoomSpriteMouseEvent } from '../events/RoomSpriteMouseEvent';
import { IRoomObject } from '../object/IRoomObject';
import { IRoomGeometry } from '../utils/IRoomGeometry';

export interface IRoomCanvasMouseListener
{
    processRoomCanvasMouseEvent(event: RoomSpriteMouseEvent, object: IRoomObject, geometry: IRoomGeometry): void
}
