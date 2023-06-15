export class PlayListEntry {
  private _startPlayHead: number = 0

  constructor(id: number, length: number, name: string, creator: string) {
    this._id = id
    this._length = length
    this._name = name
    this._creator = creator
  }

  protected _id: number

  public get id(): number {
    return this._id
  }

  protected _length: number

  public get length(): number {
    return this._length
  }

  protected _name: string

  public get name(): string {
    return this._name
  }

  protected _creator: string

  public get creator(): string {
    return this._creator
  }

  public get startPlayHeadPos(): number {
    return this._startPlayHead
  }

  public set startPlayHeadPos(k: number) {
    this._startPlayHead = k
  }
}
