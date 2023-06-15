import { IRoomRenderer, IRoomRendererFactory } from '@/api'
import { RoomRenderer } from '@/room'

export class RoomRendererFactory implements IRoomRendererFactory {
  public createRenderer(): IRoomRenderer {
    return new RoomRenderer()
  }
}
