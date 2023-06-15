import { IMessageDataWrapper, IPetFigureData } from '@/api'

export class PetFigureDataParser implements IPetFigureData {
  private _customPartCount: number

  constructor(wrapper: IMessageDataWrapper) {
    this._typeId = wrapper.readInt()
    this._paletteId = wrapper.readInt()
    this._color = wrapper.readString()
    this._breedId = wrapper.readInt()
    this._customParts = []
    this._customPartCount = wrapper.readInt()

    let i = 0

    while (i < this._customPartCount) {
      this._customParts.push(wrapper.readInt())
      this._customParts.push(wrapper.readInt())
      this._customParts.push(wrapper.readInt())

      i++
    }
  }

  private _typeId: number

  public get typeId(): number {
    return this._typeId
  }

  private _paletteId: number

  public get paletteId(): number {
    return this._paletteId
  }

  private _color: string

  public get color(): string {
    return this._color
  }

  private _breedId: number

  public get breedId(): number {
    return this._breedId
  }

  private _customParts: number[]

  public get customParts(): number[] {
    return this._customParts
  }

  public get figuredata(): string {
    let figure = ((((this.typeId + ' ') + this.paletteId) + ' ') + this.color)

    figure = (figure + (' ' + this.custompartCount))

    for (const _local_2 of this.customParts) figure = (figure + (' ' + _local_2))

    return figure
  }

  public get custompartCount(): number {
    return this._customPartCount
  }
}
