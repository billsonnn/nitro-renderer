export class TalentTrackRewardProduct {
  constructor(name: string, vipDays: number) {
    this._productCode = name
    this._vipDays = vipDays
  }

  private _productCode: string

  public get productCode(): string {
    return this._productCode
  }

  private _vipDays: number

  public get vipDays(): number {
    return this._vipDays
  }
}
