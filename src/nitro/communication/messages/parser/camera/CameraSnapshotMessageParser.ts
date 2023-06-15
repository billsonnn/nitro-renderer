import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CameraSnapshotMessageParser implements IMessageParser {
  private _roomType: string

  public get roomType(): string {
    return this._roomType
  }

  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  public flush(): boolean {
    this._roomType = null
    this._roomId = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomType = wrapper.readString()
    this._roomId = wrapper.readInt()

    return true
  }
}
