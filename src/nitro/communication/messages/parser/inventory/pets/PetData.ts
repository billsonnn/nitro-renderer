import { IMessageDataWrapper } from '@/api'
import { PetFigureDataParser } from '@/nitro'

export class PetData {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this._id = wrapper.readInt()
    this._name = wrapper.readString()
    this._figureData = new PetFigureDataParser(wrapper)
    this._level = wrapper.readInt()
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _figureData: PetFigureDataParser

  public get figureData(): PetFigureDataParser {
    return this._figureData
  }

  private _level: number

  public get level(): number {
    return this._level
  }

  public get typeId(): number {
    return this._figureData.typeId
  }

  public get paletteId(): number {
    return this._figureData.paletteId
  }

  public get color(): string {
    return this._figureData.color
  }

  public get breedId(): number {
    return this._figureData.breedId
  }

  public get customPartCount(): number {
    return this._figureData.custompartCount
  }

  public get figureString(): string {
    return this._figureData.figuredata
  }
}
