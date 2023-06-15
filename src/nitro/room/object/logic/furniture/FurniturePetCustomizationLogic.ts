import { RoomObjectVariable, RoomWidgetEnumItemExtradataParameter } from '@/api'
import { RoomObjectWidgetRequestEvent } from '@/events'
import { RoomObjectUpdateMessage } from '@/room'
import { FurnitureLogic } from '@/nitro'

export class FurniturePetCustomizationLogic extends FurnitureLogic {
  public getEventTypes(): string[] {
    const types = [RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU]

    return this.mergeTypes(super.getEventTypes(), types)
  }

  public processUpdateMessage(message: RoomObjectUpdateMessage): void {
    super.processUpdateMessage(message)

    if (!this.object) return

    if (this.object.model.getValue(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) === 1) {
      this.object.model.setValue(RoomWidgetEnumItemExtradataParameter.INFOSTAND_EXTRA_PARAM, RoomWidgetEnumItemExtradataParameter.USABLE_PRODUCT)
    }
  }

  public useObject(): void {
    if (!this.object || !this.eventDispatcher) return

    this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU, this.object))
  }
}
