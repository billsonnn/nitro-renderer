import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GuideSessionAttachedMessageParser implements IMessageParser {
  private _asGuide: boolean

  public get asGuide(): boolean {
    return this._asGuide
  }

  private _helpRequestType: number

  public get helpRequestType(): number {
    return this._helpRequestType
  }

  private _helpRequestDescription: string

  public get helpRequestDescription(): string {
    return this._helpRequestDescription
  }

  private _roleSpecificWaitTime: number

  public get roleSpecificWaitTime(): number {
    return this._roleSpecificWaitTime
  }

  public flush(): boolean {
    this._asGuide = false
    this._helpRequestType = 0
    this._helpRequestDescription = null
    this._roleSpecificWaitTime = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._asGuide = wrapper.readBoolean()
    this._helpRequestType = wrapper.readInt()
    this._helpRequestDescription = wrapper.readString()
    this._roleSpecificWaitTime = wrapper.readInt()

    return true
  }
}
