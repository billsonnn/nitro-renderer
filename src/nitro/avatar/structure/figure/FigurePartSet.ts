import { IFigureDataSet, IFigurePart, IFigurePartSet } from '@/api'
import { FigurePart } from '@/nitro'

export class FigurePartSet implements IFigurePartSet {
  constructor(type: string, data: IFigureDataSet) {
    if (!type || !data) throw new Error('invalid_data')

    this._id = data.id
    this._type = type
    this._gender = data.gender
    this._clubLevel = data.club
    this._isColorable = data.colorable
    this._isSelectable = data.selectable
    this._parts = []
    this._hiddenLayers = []
    this._isPreSelectable = data.preselectable
    this._isSellable = data.sellable

    for (const part of data.parts) {
      const newPart = new FigurePart(part)
      const partIndex = this.getPartIndex(newPart)

      if (partIndex !== -1) this._parts.splice(partIndex, 0, newPart)
      else this._parts.push(newPart)
    }

    if (data.hiddenLayers) {
      for (const hiddenLayer of data.hiddenLayers) this._hiddenLayers.push(hiddenLayer.partType)
    }
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _gender: string

  public get gender(): string {
    return this._gender
  }

  private _clubLevel: number

  public get clubLevel(): number {
    return this._clubLevel
  }

  private _isColorable: boolean

  public get isColorable(): boolean {
    return this._isColorable
  }

  private _isSelectable: boolean

  public get isSelectable(): boolean {
    return this._isSelectable
  }

  private _parts: IFigurePart[]

  public get parts(): IFigurePart[] {
    return this._parts
  }

  private _hiddenLayers: string[]

  public get hiddenLayers(): string[] {
    return this._hiddenLayers
  }

  private _isPreSelectable: boolean

  public get isPreSelectable(): boolean {
    return this._isPreSelectable
  }

  private _isSellable: boolean

  public get isSellable(): boolean {
    return this._isSellable
  }

  public dispose(): void {
    for (const part of this._parts) {
      const figurePart = part as FigurePart

      figurePart.dispose()
    }

    this._parts = null
    this._hiddenLayers = null
  }

  public getPart(k: string, _arg_2: number): IFigurePart {
    for (const part of this._parts) {
      if ((part.type !== k) || (part.id !== _arg_2)) continue

      return part
    }

    return null
  }

  private getPartIndex(part: FigurePart): number {
    const totalParts = this._parts.length

    if (!totalParts) return -1

    for (let i = 0; i < totalParts; i++) {
      const existingPart = this._parts[i]

      if (!existingPart) continue

      if (existingPart.type !== part.type || existingPart.index > part.index) continue

      return i
    }

    return -1
  }
}
