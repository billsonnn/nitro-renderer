import { RoomObjectUpdateMessage } from '@/room'

export class ObjectAdUpdateMessage extends RoomObjectUpdateMessage {
  public static IMAGE_LOADED: string = 'ROAUM_IMAGE_LOADED'
  public static IMAGE_LOADING_FAILED: string = 'ROAUM_IMAGE_FAILED'

  constructor(type: string) {
    super(null, null)

    this._type = type
  }

  private _type: string

  public get type(): string {
    return this._type
  }
}
