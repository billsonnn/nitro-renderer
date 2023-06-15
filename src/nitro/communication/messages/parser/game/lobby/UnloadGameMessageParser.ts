import { IMessageDataWrapper, IMessageParser } from '@/api'

export class UnloadGameMessageParser implements IMessageParser {
  private _gameTypeId: number

  public get gameTypeId(): number {
    return this._gameTypeId
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

    return true
  }
}
