import { RoomObjectLocationCacheItem, RoomObjectSortableSpriteCacheItem } from '@/room'

export class RoomObjectCacheItem {
  constructor(accurateZ: string) {
    this._location = new RoomObjectLocationCacheItem(accurateZ)
    this._sprites = new RoomObjectSortableSpriteCacheItem()
  }

  private _objectId: number

  public get objectId(): number {
    return this._objectId
  }

  public set objectId(k: number) {
    this._objectId = k
  }

  private _location: RoomObjectLocationCacheItem

  public get location(): RoomObjectLocationCacheItem {
    return this._location
  }

  private _sprites: RoomObjectSortableSpriteCacheItem

  public get sprites(): RoomObjectSortableSpriteCacheItem {
    return this._sprites
  }

  public dispose(): void {
    if (this._location) {
      this._location.dispose()

      this._location = null
    }

    if (this._sprites) {
      this._sprites.dispose()

      this._sprites = null
    }
  }
}
