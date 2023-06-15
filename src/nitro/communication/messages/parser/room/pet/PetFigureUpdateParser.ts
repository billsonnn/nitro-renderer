import { IMessageDataWrapper, IMessageParser } from '@/api'
import { PetFigureDataParser } from '@/nitro'

export class PetFigureUpdateParser implements IMessageParser {
  private _roomIndex: number

  public get roomIndex(): number {
    return this._roomIndex
  }

  private _petId: number

  public get petId(): number {
    return this._petId
  }

  private _figureData: PetFigureDataParser

  public get figureData(): PetFigureDataParser {
    return this._figureData
  }

  private _hasSaddle: boolean

  public get hasSaddle(): boolean {
    return this._hasSaddle
  }

  private _isRiding: boolean

  public get isRiding(): boolean {
    return this._isRiding
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomIndex = wrapper.readInt()
    this._petId = wrapper.readInt()
    this._figureData = new PetFigureDataParser(wrapper)
    this._hasSaddle = wrapper.readBoolean()
    this._isRiding = wrapper.readBoolean()

    return true
  }
}
