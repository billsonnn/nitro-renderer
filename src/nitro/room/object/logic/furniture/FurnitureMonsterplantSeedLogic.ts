import { ContextMenuEnum } from '@/api'
import { RoomObjectWidgetRequestEvent } from '@/events'
import { FurnitureMultiStateLogic } from '@/nitro'

export class FurnitureMonsterplantSeedLogic extends FurnitureMultiStateLogic {
  public get contextMenu(): string {
    return ContextMenuEnum.MONSTERPLANT_SEED
  }

  public getEventTypes(): string[] {
    const types = [RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG]

    return this.mergeTypes(super.getEventTypes(), types)
  }

  public useObject(): void {
    if (!this.object || !this.eventDispatcher) return

    this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG, this.object))
  }
}
