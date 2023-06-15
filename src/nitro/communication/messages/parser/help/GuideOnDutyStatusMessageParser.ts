import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GuideOnDutyStatusMessageParser implements IMessageParser {
  private _onDuty: boolean

  public get onDuty(): boolean {
    return this._onDuty
  }

  private _guidesOnDuty: number

  public get guidesOnDuty(): number {
    return this._guidesOnDuty
  }

  private _helpersOnDuty: number

  public get helpersOnDuty(): number {
    return this._helpersOnDuty
  }

  private _guardiansOnDuty: number

  public get guardiansOnDuty(): number {
    return this._guardiansOnDuty
  }

  public flush(): boolean {
    this._onDuty = false
    this._guidesOnDuty = 0
    this._helpersOnDuty = 0
    this._guardiansOnDuty = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._onDuty = wrapper.readBoolean()
    this._guidesOnDuty = wrapper.readInt()
    this._helpersOnDuty = wrapper.readInt()
    this._guardiansOnDuty = wrapper.readInt()

    return true
  }
}
