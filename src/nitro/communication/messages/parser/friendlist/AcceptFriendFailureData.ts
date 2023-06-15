import { IMessageDataWrapper } from '@/api'

export class AcceptFriendFailerData {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this._senderId = wrapper.readInt()
    this._errorCode = wrapper.readInt()
  }

  private _senderId: number

  public get senderId(): number {
    return this._senderId
  }

  private _errorCode: number

  public get errorCode(): number {
    return this._errorCode
  }
}
