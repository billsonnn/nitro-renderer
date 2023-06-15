export class RoomUnitStatusAction {
  constructor(action: string, value: string) {
    this._action = action
    this._value = value
  }

  private _action: string

  public get action(): string {
    return this._action
  }

  private _value: string

  public get value(): string {
    return this._value
  }
}
