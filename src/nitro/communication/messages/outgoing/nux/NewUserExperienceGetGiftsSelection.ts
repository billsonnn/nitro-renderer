export class NewUserExperienceGetGiftsSelection {
  constructor(dayIndex: number, stepIndex: number, giftIndex: number) {
    this._dayIndex = dayIndex
    this._stepIndex = stepIndex
    this._giftIndex = giftIndex
  }

  private _dayIndex: number

  public get dayIndex(): number {
    return this._dayIndex
  }

  private _stepIndex: number

  public get stepIndex(): number {
    return this._stepIndex
  }

  private _giftIndex: number

  public get giftIndex(): number {
    return this._giftIndex
  }
}
