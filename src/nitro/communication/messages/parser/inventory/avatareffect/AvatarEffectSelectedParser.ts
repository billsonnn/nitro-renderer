﻿import { IMessageDataWrapper, IMessageParser } from '@/api'

export class AvatarEffectSelectedParser implements IMessageParser {
  private _type: number

  public get type(): number {
    return this._type
  }

  public flush(): boolean {
    this._type = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._type = wrapper.readInt()

    return true
  }
}
