﻿import { IMessageDataWrapper, IMessageParser } from '@/api'

export class AvatarEffectActivatedParser implements IMessageParser {
  private _type: number

  public get type(): number {
    return this._type
  }

  private _duration: number

  public get duration(): number {
    return this._duration
  }

  private _isPermanent: boolean

  public get isPermanent(): boolean {
    return this._isPermanent
  }

  public flush(): boolean {
    this._type = 0
    this._duration = 0
    this._isPermanent = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._type = wrapper.readInt()
    this._duration = wrapper.readInt()
    this._isPermanent = wrapper.readBoolean()

    return true
  }
}
