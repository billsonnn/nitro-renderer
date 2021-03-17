import { RoomSpriteMouseEvent } from '../../events/RoomSpriteMouseEvent';
import { IRoomGeometry } from '../../utils/IRoomGeometry';

export interface IRoomObjectMouseHandler
{
    mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void;
}