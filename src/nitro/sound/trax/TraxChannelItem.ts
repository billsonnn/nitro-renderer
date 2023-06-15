export class TraxChannelItem {
  constructor(id: number, length: number) {
    this._id = id
    this._length = length
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _length: number

  public get length(): number {
    return this._length
  }
}
