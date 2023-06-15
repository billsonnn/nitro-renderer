import { IFigureDataColor, IPartColor } from '@/api'

export class PartColor implements IPartColor {
  constructor(data: IFigureDataColor) {
    if (!data) throw new Error('invalid_data')

    this._id = data.id
    this._index = data.index
    this._clubLevel = (data.club || 0)
    this._isSelectable = data.selectable
    this._rgb = parseInt('0x' + data.hexCode, 16)
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _index: number

  public get index(): number {
    return this._index
  }

  private _clubLevel: number

  public get clubLevel(): number {
    return this._clubLevel
  }

  private _isSelectable: boolean

  public get isSelectable(): boolean {
    return this._isSelectable
  }

  private _rgb: number

  public get rgb(): number {
    return this._rgb
  }
}
