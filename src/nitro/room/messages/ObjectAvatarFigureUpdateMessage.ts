import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarFigureUpdateMessage extends ObjectStateUpdateMessage {
  constructor(figure: string, gender: string = null, subType: string = null, isRiding: boolean = false) {
    super()

    this._figure = figure
    this._gender = gender
    this._subType = subType
    this._isRiding = isRiding
  }

  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _gender: string

  public get gender(): string {
    return this._gender
  }

  private _subType: string

  public get subType(): string {
    return this._subType
  }

  private _isRiding: boolean

  public get isRiding(): boolean {
    return this._isRiding
  }
}
