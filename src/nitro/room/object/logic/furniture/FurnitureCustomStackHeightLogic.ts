import { IAssetData, RoomObjectVariable } from '@/api'
import { RoomObjectWidgetRequestEvent } from '@/events'
import { FurnitureMultiStateLogic } from '@/nitro'

export class FurnitureCustomStackHeightLogic extends FurnitureMultiStateLogic {
  public getEventTypes(): string[] {
    const types = [
      RoomObjectWidgetRequestEvent.STACK_HEIGHT
    ]

    return this.mergeTypes(super.getEventTypes(), types)
  }

  public initialize(asset: IAssetData): void {
    super.initialize(asset)

    if (this.object && this.object.model) this.object.model.setValue(RoomObjectVariable.FURNITURE_ALWAYS_STACKABLE, 1)
  }

  public useObject(): void {
    if (!this.object || !this.eventDispatcher) return

    this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.STACK_HEIGHT, this.object))

    super.useObject()
  }
}
