import { IMessageDataWrapper, IMessageParser } from '@/api'

export class LoadGameMessageParser implements IMessageParser {
  private _gameTypeId: number

  public get gameTypeId(): number {
    return this._gameTypeId
  }

  private _url: string

  public get url(): string {
    return this._url
  }

  private _quality: string

  public get quality(): string {
    return this._quality
  }

  private _scaleMode: string

  public get scaleMode(): string {
    return this._scaleMode
  }

  private _frameRate: number

  public get frameRate(): number {
    return this._frameRate
  }

  private _minMajorVersion: number

  public get minMajorVersion(): number {
    return this._minMajorVersion
  }

  private _minMinorVersion: number

  public get minMinorVersion(): number {
    return this._minMinorVersion
  }

  private _params: Map<string, string>

  public get params(): Map<string, string> {
    return this._params
  }

  private _gameClientId: string

  public get gameClientId(): string {
    return this._gameClientId
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._gameTypeId = wrapper.readInt()
    this._gameClientId = wrapper.readString()
    this._url = wrapper.readString()
    this._quality = wrapper.readString()
    this._scaleMode = wrapper.readString()
    this._frameRate = wrapper.readInt()
    this._minMajorVersion = wrapper.readInt()
    this._minMinorVersion = wrapper.readInt()
    this._params = new Map<string, string>()
    const count = wrapper.readInt()
    let _local_3 = 0
    while (_local_3 < count) {
      this._params.set(wrapper.readString(), wrapper.readString())
      _local_3++
    }

    return true
  }
}
