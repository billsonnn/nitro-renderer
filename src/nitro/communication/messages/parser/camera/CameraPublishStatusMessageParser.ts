import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CameraPublishStatusMessageParser implements IMessageParser {
  private _ok: boolean = false

  public get ok(): boolean {
    return this._ok
  }

  private _secondsToWait: number = 0

  public get secondsToWait(): number {
    return this._secondsToWait
  }

  private _extraDataId: string

  public get extraDataId(): string {
    return this._extraDataId
  }

  public flush(): boolean {
    this._ok = false
    this._secondsToWait = 0
    this._extraDataId = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._ok = wrapper.readBoolean()
    this._secondsToWait = wrapper.readInt()

    if (this._ok && wrapper.bytesAvailable) this._extraDataId = wrapper.readString()

    return true
  }
}
