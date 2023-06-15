export class ActionType {
  constructor(data: any) {
    this._id = parseInt(data.id)
    this._value = parseInt(data.id)
    this._prevents = data.prevents || []
    this._preventHeadTurn = data.preventHeadTurn || false
    this._isAnimated = true

    if ((data.animated !== undefined) && (data.animated === false)) this._isAnimated = false
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _value: number

  public get value(): number {
    return this._value
  }

  private _prevents: string[]

  public get prevents(): string[] {
    return this._prevents
  }

  private _preventHeadTurn: boolean

  public get preventHeadTurn(): boolean {
    return this._preventHeadTurn
  }

  private _isAnimated: boolean

  public get isAnimated(): boolean {
    return this._isAnimated
  }
}
