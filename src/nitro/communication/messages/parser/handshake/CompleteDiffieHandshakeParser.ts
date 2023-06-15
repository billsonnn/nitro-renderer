import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CompleteDiffieHandshakeParser implements IMessageParser {
  private _encryptedPublicKey: string = null

  public get encryptedPublicKey(): string {
    return this._encryptedPublicKey
  }

  private _serverClientEncryption: boolean = false

  public get serverClientEncryption(): boolean {
    return this._serverClientEncryption
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._encryptedPublicKey = wrapper.readString()

    if (wrapper.bytesAvailable) {
      this._serverClientEncryption = wrapper.readBoolean()
    }

    return true
  }
}
