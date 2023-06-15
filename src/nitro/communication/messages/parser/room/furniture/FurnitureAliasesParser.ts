import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FurnitureAliasesParser implements IMessageParser {
  private _aliases: Map<string, string>

  public get aliases(): Map<string, string> {
    return this._aliases
  }

  public flush(): boolean {
    this._aliases = new Map()

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let totalCount = wrapper.readInt()

    while (totalCount > 0) {
      this._aliases.set(wrapper.readString(), wrapper.readString())

      totalCount--
    }

    return true
  }
}
