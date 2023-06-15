import { IMessageDataWrapper } from '@/api'

export class FriendRequestData {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this._requestId = wrapper.readInt()
    this._requesterName = wrapper.readString()
    this._figureString = wrapper.readString()
    this._requesterUserId = this._requestId
  }

  private _requestId: number

  public get requestId(): number {
    return this._requestId
  }

  private _requesterName: string

  public get requesterName(): string {
    return this._requesterName
  }

  private _requesterUserId: number

  public get requesterUserId(): number {
    return this._requesterUserId
  }

  private _figureString: string

  public get figureString(): string {
    return this._figureString
  }
}
