import { IMessageDataWrapper, IMessageParser } from '@/api'
import { OutfitData } from '@/nitro'

export class WardrobeMessageParser implements IMessageParser {
  private _state: number

  public get state(): number {
    return this._state
  }

  private _outfits: OutfitData[]

  public get outfits(): OutfitData[] {
    return this._outfits
  }

  public flush(): boolean {
    this._state = 0
    this._outfits = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._state = wrapper.readInt()

    let count = wrapper.readInt()

    while (count > 0) {
      this._outfits.push(new OutfitData(wrapper))

      count--
    }

    return true
  }
}
