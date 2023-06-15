import { IAssetData, RoomObjectVariable } from '@/api'
import { RoomObjectFurnitureActionEvent, RoomObjectWidgetRequestEvent } from '@/events'
import { RoomObjectUpdateMessage } from '@/room'
import { FurnitureLogic, ObjectItemDataUpdateMessage } from '@/nitro'

export class FurnitureStickieLogic extends FurnitureLogic {
  private static STICKIE_COLORS: string[] = ['9CCEFF', 'FF9CFF', '9CFF9C', 'FFFF33']

  public getEventTypes(): string[] {
    const types = [
      RoomObjectWidgetRequestEvent.STICKIE,
      RoomObjectFurnitureActionEvent.STICKIE
    ]

    return this.mergeTypes(super.getEventTypes(), types)
  }

  public initialize(asset: IAssetData): void {
    super.initialize(asset)

    this.updateColor()

    if (this.object) this.object.model.setValue(RoomObjectVariable.FURNITURE_IS_STICKIE, '')
  }

  public processUpdateMessage(message: RoomObjectUpdateMessage): void {
    super.processUpdateMessage(message)

    if (message instanceof ObjectItemDataUpdateMessage) {
      this.eventDispatcher && this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.STICKIE, this.object))
    }

    this.updateColor()
  }

  public useObject(): void {
    if (!this.object || !this.eventDispatcher) return

    this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.STICKIE, this.object))
  }

  protected updateColor(): void {
    if (!this.object) return

    const furnitureData = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA)

    let colorIndex = FurnitureStickieLogic.STICKIE_COLORS.indexOf(furnitureData)

    if (colorIndex < 0) colorIndex = 3

    this.object.model.setValue(RoomObjectVariable.FURNITURE_COLOR, (colorIndex + 1))
  }
}
