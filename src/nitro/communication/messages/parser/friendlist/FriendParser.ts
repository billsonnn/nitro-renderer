import { IMessageDataWrapper } from '@/api'

export class FriendParser {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this._id = wrapper.readInt()
    this._name = wrapper.readString()
    this._gender = wrapper.readInt()
    this._online = wrapper.readBoolean()
    this._followingAllowed = wrapper.readBoolean()
    this._figure = wrapper.readString()
    this._categoryId = wrapper.readInt()
    this._motto = wrapper.readString()
    this._realName = wrapper.readString()
    this._lastAccess = wrapper.readString()
    this._persistedMessageUser = wrapper.readBoolean()
    this._vipMember = wrapper.readBoolean()
    this._pocketHabboUser = wrapper.readBoolean()
    this._relationshipStatus = wrapper.readShort()
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _gender: number

  public get gender(): number {
    return this._gender
  }

  private _online: boolean

  public get online(): boolean {
    return this._online
  }

  private _followingAllowed: boolean

  public get followingAllowed(): boolean {
    return this._followingAllowed
  }

  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _categoryId: number

  public get categoryId(): number {
    return this._categoryId
  }

  private _motto: string

  public get motto(): string {
    return this._motto
  }

  private _realName: string

  public get realName(): string {
    return this._realName
  }

  private _lastAccess: string

  public get lastAccess(): string {
    return this._lastAccess
  }

  private _persistedMessageUser: boolean

  public get persistedMessageUser(): boolean {
    return this._persistedMessageUser
  }

  private _vipMember: boolean

  public get vipMember(): boolean {
    return this._vipMember
  }

  private _pocketHabboUser: boolean

  public get pocketHabboUser(): boolean {
    return this._pocketHabboUser
  }

  private _relationshipStatus: number

  public get relationshipStatus(): number {
    return this._relationshipStatus
  }
}
