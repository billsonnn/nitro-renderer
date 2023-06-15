import { IMessageDataWrapper } from '@/api'

export class HabboSearchResultData {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this._avatarId = wrapper.readInt()
    this._avatarName = wrapper.readString()
    this._avatarMotto = wrapper.readString()
    this._isAvatarOnline = wrapper.readBoolean()
    this._canFollow = wrapper.readBoolean()

    this._lastOnlineData = wrapper.readString() // this was not assigned to anything on original packet

    this._avatarGender = wrapper.readInt()
    this._avatarFigure = wrapper.readString()
    this._realName = wrapper.readString()
  }

  private _avatarId: number

  public get avatarId(): number {
    return this._avatarId
  }

  private _avatarName: string

  public get avatarName(): string {
    return this._avatarName
  }

  private _avatarMotto: string

  public get avatarMotto(): string {
    return this._avatarMotto
  }

  private _isAvatarOnline: boolean

  public get isAvatarOnline(): boolean {
    return this._isAvatarOnline
  }

  private _canFollow: boolean

  public get canFollow(): boolean {
    return this._canFollow
  }

  private _avatarGender: number

  public get avatarGender(): number {
    return this._avatarGender
  }

  private _avatarFigure: string

  public get avatarFigure(): string {
    return this._avatarFigure
  }

  private _lastOnlineData: string

  public get lastOnlineData(): string {
    return this._lastOnlineData
  }

  private _realName: string

  public get realName(): string {
    return this._realName
  }
}
