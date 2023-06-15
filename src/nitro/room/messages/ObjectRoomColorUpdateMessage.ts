import { RoomObjectUpdateMessage } from '@/room'

export class ObjectRoomColorUpdateMessage extends RoomObjectUpdateMessage {
  public static BACKGROUND_COLOR: string = 'RORCUM_BACKGROUND_COLOR'

  constructor(type: string, color: number, light: number, backgroundOnly: boolean) {
    super(null, null)

    this._type = type
    this._color = color
    this._light = light
    this._backgroundOnly = backgroundOnly
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _color: number

  public get color(): number {
    return this._color
  }

  private _light: number

  public get light(): number {
    return this._light
  }

  private _backgroundOnly: boolean

  public get backgroundOnly(): boolean {
    return this._backgroundOnly
  }
}
