import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GameInviteMessageParser implements IMessageParser {
  private _gameTypeId: number

  public get gameTypeId(): number {
    return this._gameTypeId
  }

  private _inviterId: number

  public get inviterId(): number {
    return this._inviterId
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._gameTypeId = wrapper.readInt()
    this._inviterId = wrapper.readInt()

    return true
  }
}
