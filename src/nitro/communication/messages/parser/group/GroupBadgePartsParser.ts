import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GroupBadgePartsParser implements IMessageParser {
  private _bases: Map<number, string[]>

  public get bases(): Map<number, string[]> {
    return this._bases
  }

  private _symbols: Map<number, string[]>

  public get symbols(): Map<number, string[]> {
    return this._symbols
  }

  private _partColors: Map<number, string>

  public get partColors(): Map<number, string> {
    return this._partColors
  }

  private _colorsA: Map<number, string>

  public get colorsA(): Map<number, string> {
    return this._colorsA
  }

  private _colorsB: Map<number, string>

  public get colorsB(): Map<number, string> {
    return this._colorsB
  }

  flush(): boolean {
    this._bases = new Map()
    this._symbols = new Map()
    this._partColors = new Map()
    this._colorsA = new Map()
    this._colorsB = new Map()

    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let basesCount = wrapper.readInt()

    while (basesCount > 0) {
      const id = wrapper.readInt()
      const valueA = wrapper.readString()
      const valueB = wrapper.readString()

      this._bases.set(id, [valueA, valueB])
      basesCount--
    }

    let symbolsCount = wrapper.readInt()

    while (symbolsCount > 0) {
      const id = wrapper.readInt()
      const valueA = wrapper.readString()
      const valueB = wrapper.readString()

      this._symbols.set(id, [valueA, valueB])
      symbolsCount--
    }

    let partColorsCount = wrapper.readInt()

    while (partColorsCount > 0) {
      const id = wrapper.readInt()
      const color = wrapper.readString()

      this._partColors.set(id, color)
      partColorsCount--
    }

    let colorsACount = wrapper.readInt()

    while (colorsACount > 0) {
      const id = wrapper.readInt()
      const color = wrapper.readString()

      this._colorsA.set(id, color)
      colorsACount--
    }

    let colorsBCount = wrapper.readInt()

    while (colorsBCount > 0) {
      const id = wrapper.readInt()
      const color = wrapper.readString()

      this._colorsB.set(id, color)
      colorsBCount--
    }
    return true
  }
}
