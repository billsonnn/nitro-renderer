import { ContextMenuEnum } from '@/api'
import { FurnitureMultiStateLogic } from '@/nitro'

export class FurnitureRandomTeleportLogic extends FurnitureMultiStateLogic {
  public get contextMenu(): string {
    return ContextMenuEnum.RANDOM_TELEPORT
  }
}
