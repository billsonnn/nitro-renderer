import { IRoomGeometry, IRoomObject, IRoomSpriteMouseEvent } from '@/api'

export interface IRoomCanvasMouseListener {
  processRoomCanvasMouseEvent(event: IRoomSpriteMouseEvent, object: IRoomObject, geometry: IRoomGeometry): void
}
