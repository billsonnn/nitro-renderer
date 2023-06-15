import { IMessageDataWrapper, IMessageParser } from '@/api'

export class BadgeReceivedParser implements IMessageParser {
  private _badgeId: number

  public get badgeId(): number {
    return this._badgeId
  }

  private _badgeCode: string

  public get badgeCode(): string {
    return this._badgeCode
  }

  public flush(): boolean {
    this._badgeId = 0
    this._badgeCode = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._badgeId = wrapper.readInt()
    this._badgeCode = wrapper.readString()

    return true
  }
}
