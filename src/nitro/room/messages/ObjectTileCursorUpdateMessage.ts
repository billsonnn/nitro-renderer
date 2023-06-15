import { Vector3d } from '@/api'
import { RoomObjectUpdateMessage } from '@/room'

export class ObjectTileCursorUpdateMessage extends RoomObjectUpdateMessage {
  constructor(k: Vector3d, height: number, visible: boolean, sourceEventId: string, toggleVisibility: boolean = false) {
    super(k, null)

    this._height = height
    this._visible = visible
    this._sourceEventId = sourceEventId
    this._toggleVisibility = toggleVisibility
  }

  private _height: number

  public get height(): number {
    return this._height
  }

  private _sourceEventId: string

  public get sourceEventId(): string {
    return this._sourceEventId
  }

  private _visible: boolean

  public get visible(): boolean {
    return this._visible
  }

  private _toggleVisibility: boolean

  public get toggleVisibility(): boolean {
    return this._toggleVisibility
  }
}
