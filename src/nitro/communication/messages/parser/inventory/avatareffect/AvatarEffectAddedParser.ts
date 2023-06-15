import { IMessageDataWrapper, IMessageParser } from '@/api'

export class AvatarEffectAddedParser implements IMessageParser {
  private _permanent: boolean

  private _type: number

  public get type(): number {
    return this._type
  }

  private _subType: number

  public get subType(): number {
    return this._subType
  }

  private _duration: number

  public get duration(): number {
    return this._duration
  }

  public get isPermanent(): boolean {
    return this._permanent
  }

  public flush(): boolean {
    this._type = 0
    this._subType = 0
    this._duration = 0
    this._permanent = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._type = wrapper.readInt()
    this._subType = wrapper.readInt()
    this._duration = wrapper.readInt()
    this._permanent = wrapper.readBoolean()

    return true
  }
}
