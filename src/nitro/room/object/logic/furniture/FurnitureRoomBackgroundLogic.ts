import { IRoomObjectModel } from '@/api'
import { FurnitureRoomBrandingLogic } from '@/nitro'

export class FurnitureRoomBackgroundLogic extends FurnitureRoomBrandingLogic {
  protected getAdClickUrl(model: IRoomObjectModel): string {
    return null
  }
}
