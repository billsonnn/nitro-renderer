import { AdvancedMap, IAdvancedMap, IMessageDataWrapper, IMessageParser } from '@/api'

export class JukeboxSongDisksMessageParser implements IMessageParser {
  private _songDisks: IAdvancedMap<number, number> = new AdvancedMap()

  public get songDisks(): IAdvancedMap<number, number> {
    return this._songDisks
  }

  private _maxLength: number

  public get maxLength(): number {
    return this._maxLength
  }

  flush(): boolean {
    this._songDisks.reset()
    this._maxLength = 0
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._maxLength = wrapper.readInt()
    const count = wrapper.readInt()

    for (let i = 0; i < count; i++) {
      this._songDisks.add(wrapper.readInt(), wrapper.readInt())
    }

    return true
  }
}
