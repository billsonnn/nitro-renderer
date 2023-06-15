import { IRoomGeometry, IRoomSpriteMouseEvent } from '@/api'

export interface IRoomObjectMouseHandler {
  mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void;
}
