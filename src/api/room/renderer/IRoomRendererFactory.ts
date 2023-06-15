import { IRoomRenderer } from '@/api'

export interface IRoomRendererFactory {
  createRenderer(): IRoomRenderer;
}
