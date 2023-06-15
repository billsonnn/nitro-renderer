import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PhoneCollectionStateParser implements IMessageParser {
  private _phoneStatusCode: number

  public get phoneStatusCode(): number {
    return this._phoneStatusCode
  }

  private _collectionStatusCode: number

  public get collectionStatusCode(): number {
    return this._collectionStatusCode
  }

  private _millisecondsToAllowProcessReset: number

  public get millisecondsToAllowProcessReset(): number {
    return this._millisecondsToAllowProcessReset
  }

  public flush(): boolean {
    this._phoneStatusCode = -1
    this._millisecondsToAllowProcessReset = -1
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._phoneStatusCode = wrapper.readInt()
    this._collectionStatusCode = wrapper.readInt()
    this._millisecondsToAllowProcessReset = wrapper.readInt()

    return true
  }
}
