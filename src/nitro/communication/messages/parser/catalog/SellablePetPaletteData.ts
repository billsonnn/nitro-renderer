import { IMessageDataWrapper } from '@/api'

export class SellablePetPaletteData {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _type: number

  public get type(): number {
    return this._type
  }

  private _breedId: number

  public get breedId(): number {
    return this._breedId
  }

  private _paletteId: number

  public get paletteId(): number {
    return this._paletteId
  }

  private _sellable: boolean

  public get sellable(): boolean {
    return this._sellable
  }

  private _rare: boolean

  public get rare(): boolean {
    return this._rare
  }

  public flush(): boolean {
    this._type = -1
    this._breedId = -1
    this._paletteId = -1
    this._sellable = false
    this._rare = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._type = wrapper.readInt()
    this._breedId = wrapper.readInt()
    this._paletteId = wrapper.readInt()
    this._sellable = wrapper.readBoolean()
    this._rare = wrapper.readBoolean()

    return true
  }
}
