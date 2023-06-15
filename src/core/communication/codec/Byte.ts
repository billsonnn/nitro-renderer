export class Byte {
  constructor(value: number) {
    this._value = value
  }

  private _value: number

  public get value(): number {
    return this._value
  }
}
