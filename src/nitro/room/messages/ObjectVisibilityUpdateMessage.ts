import { RoomObjectUpdateMessage } from '@/room'

export class ObjectVisibilityUpdateMessage extends RoomObjectUpdateMessage {
  public static ENABLED: string = 'ROVUM_ENABLED'
  public static DISABLED: string = 'ROVUM_DISABLED'

  constructor(type: string) {
    super(null, null)

    this._type = type
  }

  private _type: string

  public get type(): string {
    return this._type
  }
}
