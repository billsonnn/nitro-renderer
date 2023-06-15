import { IMessageDataWrapper, IMessageParser } from '@/api'

export class InitCameraMessageParser implements IMessageParser {
  private _creditPrice: number = 0

  public get creditPrice(): number {
    return this._creditPrice
  }

  private _ducketPrice: number = 0

  public get ducketPrice(): number {
    return this._ducketPrice
  }

  private _publishDucketPrice: number = 0

  public get publishDucketPrice(): number {
    return this._publishDucketPrice
  }

  public flush(): boolean {
    this._creditPrice = 0
    this._ducketPrice = 0
    this._publishDucketPrice = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._creditPrice = wrapper.readInt()
    this._ducketPrice = wrapper.readInt()

    if (wrapper.bytesAvailable) this._publishDucketPrice = wrapper.readInt()

    return true
  }
}
