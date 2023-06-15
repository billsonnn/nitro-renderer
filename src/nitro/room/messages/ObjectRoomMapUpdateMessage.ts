import { RoomObjectUpdateMessage } from '@/room'
import { RoomMapData } from '@/nitro'

export class ObjectRoomMapUpdateMessage extends RoomObjectUpdateMessage {
  public static UPDATE_MAP: string = 'RORMUM_UPDATE_MAP'

  constructor(mapData: RoomMapData) {
    super(null, null)

    this._type = ObjectRoomMapUpdateMessage.UPDATE_MAP
    this._mapData = mapData
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _mapData: RoomMapData

  public get mapData(): RoomMapData {
    return this._mapData
  }
}
