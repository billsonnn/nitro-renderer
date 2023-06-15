import { IAssetAlias } from '@/api'

export class AssetAlias {
  constructor(name: string, alias: IAssetAlias) {
    this._name = name
    this._link = alias.link
    this._flipH = alias.flipH
    this._flipV = alias.flipV
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _link: string

  public get link(): string {
    return this._link
  }

  private _flipH: boolean

  public get flipH(): boolean {
    return this._flipH
  }

  private _flipV: boolean

  public get flipV(): boolean {
    return this._flipV
  }
}
