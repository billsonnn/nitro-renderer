import { IAssetAnimationDirection } from '@/api'

export class DirectionDataContainer {
  constructor(k: IAssetAnimationDirection) {
    this._offset = k.offset
  }

  private _offset: number

  public get offset(): number {
    return this._offset
  }
}
