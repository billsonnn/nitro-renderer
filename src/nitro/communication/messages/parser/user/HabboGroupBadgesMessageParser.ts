import { IMessageDataWrapper, IMessageParser } from '@/api'

export class HabboGroupBadgesMessageParser implements IMessageParser {
  private _badges: Map<number, string>

  public get badges(): Map<number, string> {
    return this._badges
  }

  flush(): boolean {
    this._badges = new Map()

    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let badgesCount = wrapper.readInt()

    while (badgesCount > 0) {
      const id = wrapper.readInt()
      const badge = wrapper.readString()

      this._badges.set(id, badge)
      badgesCount--
    }

    return true
  }
}
