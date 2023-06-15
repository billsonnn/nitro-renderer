import { IAssetData, RoomObjectVariable } from '@/api'
import { RoomObjectWidgetRequestEvent } from '@/events'
import { RoomObjectUpdateMessage } from '@/room'
import { FurnitureLogic, ObjectDataUpdateMessage } from '@/nitro'

export class FurnitureClothingChangeLogic extends FurnitureLogic {
  public getEventTypes(): string[] {
    const types = [RoomObjectWidgetRequestEvent.CLOTHING_CHANGE]

    return this.mergeTypes(super.getEventTypes(), types)
  }

  public initialize(asset: IAssetData): void {
    super.initialize(asset)

    const furniData = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA)

    this.updateClothingData(furniData)
  }

  public processUpdateMessage(message: RoomObjectUpdateMessage): void {
    super.processUpdateMessage(message)

    if (message instanceof ObjectDataUpdateMessage) message.data && this.updateClothingData(message.data.getLegacyString())
  }

  public useObject(): void {
    if (!this.object || !this.eventDispatcher) return

    this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.CLOTHING_CHANGE, this.object))
  }

  private updateClothingData(furnitureData: string): void {
    if (!furnitureData || !furnitureData.length) return

    const [boyClothing, girlClothing] = furnitureData.split(',')

    if (boyClothing && boyClothing.length) this.object.model.setValue<string>(RoomObjectVariable.FURNITURE_CLOTHING_BOY, boyClothing)
    if (girlClothing && girlClothing.length) this.object.model.setValue<string>(RoomObjectVariable.FURNITURE_CLOTHING_GIRL, girlClothing)
  }
}
