export class PartDefinition {
  constructor(data: any) {
    if (!data) throw new Error('invalid_data')

    this._setType = data.setType
    this._flippedSetType = data.flippedSetType || null
    this._removeSetType = data.removeSetType || null
    this._appendToFigure = false
    this._staticId = -1
  }

  private _setType: string

  public get setType(): string {
    return this._setType
  }

  private _flippedSetType: string

  public get flippedSetType(): string {
    return this._flippedSetType
  }

  public set flippedSetType(type: string) {
    this._flippedSetType = type
  }

  private _removeSetType: string

  public get removeSetType(): string {
    return this._removeSetType
  }

  private _appendToFigure: boolean

  public get appendToFigure(): boolean {
    return this._appendToFigure
  }

  public set appendToFigure(flag: boolean) {
    this._appendToFigure = flag
  }

  private _staticId: number

  public get staticId(): number {
    return this._staticId
  }

  public set staticId(k: number) {
    this._staticId = k
  }

  public hasStaticId(): boolean {
    return this._staticId >= 0
  }
}
