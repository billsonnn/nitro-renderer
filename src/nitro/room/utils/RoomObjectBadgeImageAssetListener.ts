import { IRoomObjectController } from '@/api'

export class RoomObjectBadgeImageAssetListener {
  constructor(object: IRoomObjectController, groupBadge: boolean) {
    this._object = object
    this._groupBadge = groupBadge
  }

  private _object: IRoomObjectController

  public get object(): IRoomObjectController {
    return this._object
  }

  private _groupBadge: boolean

  public get groupBadge(): boolean {
    return this._groupBadge
  }
}
