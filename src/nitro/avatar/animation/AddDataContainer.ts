import { IAssetAnimationAdd } from '@/api'

export class AddDataContainer {
  constructor(k: IAssetAnimationAdd) {
    this._id = k.id || ''
    this._align = k.align || ''
    this._base = k.base || ''
    this._ink = k.ink || 0
    this._blend = 0

    const _local_2 = k.blend

    if (_local_2) {
      if (_local_2.length > 0) {
        this._blend = parseInt(_local_2)

        if (this._blend > 1) this._blend = (this._blend / 100)
      }
    }
  }

  private _id: string

  public get id(): string {
    return this._id
  }

  private _align: string

  public get align(): string {
    return this._align
  }

  private _base: string

  public get base(): string {
    return this._base
  }

  private _ink: number

  public get ink(): number {
    return this._ink
  }

  private _blend: number

  public get blend(): number {
    return this._blend
  }

  public get isBlended(): boolean {
    return this._blend !== 1
  }
}
