import { IMessageDataWrapper, IMessageParser } from '@/api'

export class MaintenanceStatusMessageParser implements IMessageParser {
  private _isInMaintenance: boolean

  public get isInMaintenance(): boolean {
    return this._isInMaintenance
  }

  private _minutesUntilMaintenance: number

  public get minutesUntilMaintenance(): number {
    return this._minutesUntilMaintenance
  }

  private _duration: number

  public get duration(): number {
    return this._duration
  }

  public flush(): boolean {
    this._isInMaintenance = false
    this._minutesUntilMaintenance = 0
    this._duration = 15

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._isInMaintenance = wrapper.readBoolean()
    this._minutesUntilMaintenance = wrapper.readInt()

    if (wrapper.bytesAvailable) {
      this._duration = wrapper.readInt()
    }

    return true
  }
}
