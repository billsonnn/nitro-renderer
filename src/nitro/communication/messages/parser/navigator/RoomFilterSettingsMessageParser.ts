import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomFilterSettingsMessageParser implements IMessageParser {
  private _words: string[]

  public get words(): string[] {
    return this._words
  }

  public flush(): boolean {
    this._words = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let totalWords = wrapper.readInt()

    while (totalWords > 0) {
      this._words.push(wrapper.readString())

      totalWords--
    }

    return true
  }
}
