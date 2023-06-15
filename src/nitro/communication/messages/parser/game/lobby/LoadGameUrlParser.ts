import { IMessageDataWrapper, IMessageParser } from '@/api'

export class LoadGameUrlParser implements IMessageParser {
  private _gameTypeId: number

  public get gameTypeId(): number {
    return this._gameTypeId
  }

  private _url: string

  public get url(): string {
    return this._url
  }

  private _gameClientId: string

  public get gameClientId(): string {
    return this._gameClientId
  }

  public flush(): boolean {
    this._gameTypeId = 0
    this._url = null
    this._gameClientId = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._gameTypeId = wrapper.readInt()
    this._gameClientId = wrapper.readString()
    this._url = wrapper.readString()

    return true
  }
}
