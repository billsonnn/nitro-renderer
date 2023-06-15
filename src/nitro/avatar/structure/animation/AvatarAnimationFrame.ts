export class AvatarAnimationFrame {
  constructor(data: any) {
    this._number = data.number
    this._assetPartDefinition = data.assetPartDefinition || null
  }

  private _number: number

  public get number(): number {
    return this._number
  }

  private _assetPartDefinition: string

  public get assetPartDefinition(): string {
    return this._assetPartDefinition
  }
}
