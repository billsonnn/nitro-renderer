import { IMessageDataWrapper, IMessageParser } from '@/api'

export class InitDiffieHandshakeParser implements IMessageParser {
  private _encryptedPrime: string

  public get encryptedPrime(): string {
    return this._encryptedPrime
  }

  private _encryptedGenerator: string

  public get encryptedGenerator(): string {
    return this._encryptedGenerator
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._encryptedPrime = wrapper.readString()
    this._encryptedGenerator = wrapper.readString()

    return true
  }
}
