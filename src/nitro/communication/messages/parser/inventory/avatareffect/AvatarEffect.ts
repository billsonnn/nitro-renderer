export class AvatarEffect {
  private _permanent: boolean

  private _type: number

  public get type(): number {
    return this._type
  }

  public set type(k: number) {
    this._type = k
  }

  private _subType: number

  public get subType(): number {
    return this._subType
  }

  public set subType(k: number) {
    this._subType = k
  }

  private _duration: number

  public get duration(): number {
    return this._duration
  }

  public set duration(k: number) {
    this._duration = k
  }

  private _inactiveEffectsInInventory: number

  public get inactiveEffectsInInventory(): number {
    return this._inactiveEffectsInInventory
  }

  public set inactiveEffectsInInventory(k: number) {
    this._inactiveEffectsInInventory = k
  }

  private _secondsLeftIfActive: number

  public get secondsLeftIfActive(): number {
    return this._secondsLeftIfActive
  }

  public set secondsLeftIfActive(k: number) {
    this._secondsLeftIfActive = k
  }

  public get isPermanent(): boolean {
    return this._permanent
  }

  public set isPermanent(k: boolean) {
    this._permanent = k
  }
}
