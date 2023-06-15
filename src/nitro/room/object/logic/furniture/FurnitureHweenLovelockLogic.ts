import { FriendFurniEngravingWidgetType } from '@/api'
import { FurnitureFriendFurniLogic } from '@/nitro'

export class FurnitureHweenLovelockLogic extends FurnitureFriendFurniLogic {
  public get engravingDialogType(): number {
    return FriendFurniEngravingWidgetType.HABBOWEEN
  }
}
