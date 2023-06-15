import { IMessageDataWrapper, IMessageParser } from '@/api'

export class AvailabilityStatusMessageParser implements IMessageParser {
  private _isOpen: boolean

  public get isOpen(): boolean {
    return this._isOpen
  }

  private _onShutdown: boolean

  public get onShutdown(): boolean {
    return this._onShutdown
  }

  private _isAuthenticUser: boolean

  public get isAuthenticUser(): boolean {
    return this._isAuthenticUser
  }

  public flush(): boolean {
    this._isOpen = false
    this._onShutdown = false
    this._isAuthenticUser = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._isOpen = wrapper.readBoolean()
    this._onShutdown = wrapper.readBoolean()

    if (wrapper.bytesAvailable) {
      this._isAuthenticUser = wrapper.readBoolean()
    }

    return true
  }
}
