import { IMessageDataWrapper, IMessageParser } from '@/api'

export class UserCurrentBadgesParser implements IMessageParser {
  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _badges: string[]

  public get badges(): string[] {
    return this._badges
  }

  public flush(): boolean {
    this._userId = null
    this._badges = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._userId = wrapper.readInt()

    let totalBadges = wrapper.readInt()

    while (totalBadges > 0) {
      const slotId = wrapper.readInt()
      const badgeCode = wrapper.readString()

      this._badges.push(badgeCode)

      totalBadges--
    }

    return true
  }
}
