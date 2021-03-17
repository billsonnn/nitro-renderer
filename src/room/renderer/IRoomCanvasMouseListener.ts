import { RoomSpriteMouseEvent } from '../events/RoomSpriteMouseEvent';
import { IRoomObject } from '../object/IRoomObject';
import { IRoomGeometry } from '../utils/IRoomGeometry';

export interface IRoomCanvasMouseListener
{
    _Str_20330(event: RoomSpriteMouseEvent, object: IRoomObject, geometry: IRoomGeometry): void
}