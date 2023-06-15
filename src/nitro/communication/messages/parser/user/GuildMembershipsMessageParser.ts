import { IMessageDataWrapper, IMessageParser } from '@/api'
import { HabboGroupEntryData } from '@/nitro'

export class GuildMembershipsMessageParser implements IMessageParser {
  private _groups: HabboGroupEntryData[]

  public get groups(): HabboGroupEntryData[] {
    return this._groups
  }

  public flush(): boolean {
    this._groups = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let totalOffers = wrapper.readInt()

    while (totalOffers > 0) {
      this._groups.push(new HabboGroupEntryData(wrapper))

      totalOffers--
    }

    return true
  }
}
