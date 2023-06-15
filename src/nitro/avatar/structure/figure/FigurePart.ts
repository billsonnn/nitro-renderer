import { IFigureDataPart, IFigurePart } from '@/api'

export class FigurePart implements IFigurePart {
  private _paletteMapId: number

  constructor(data: IFigureDataPart) {
    if (!data) throw new Error('invalid_data')

    this._id = data.id
    this._type = data.type
    this._index = data.index
    this._colorLayerIndex = data.colorindex
    this._paletteMapId = -1
    this._breed = -1
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _breed: number

  public get breed(): number {
    return this._breed
  }

  private _index: number

  public get index(): number {
    return this._index
  }

  private _colorLayerIndex: number

  public get colorLayerIndex(): number {
    return this._colorLayerIndex
  }

  public get paletteMap(): number {
    return this._paletteMapId
  }

  public dispose(): void {

  }
}
