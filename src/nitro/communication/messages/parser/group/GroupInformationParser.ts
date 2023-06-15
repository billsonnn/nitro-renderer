import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GroupInformationParser implements IMessageParser {
  private _id: number

  public get id(): number {
    return this._id
  }

  private _type: number

  public get type(): number {
    return this._type
  }

  private _title: string

  public get title(): string {
    return this._title
  }

  private _description: string

  public get description(): string {
    return this._description
  }

  private _badge: string

  public get badge(): string {
    return this._badge
  }

  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _roomName: string

  public get roomName(): string {
    return this._roomName
  }

  private _membershipType: number

  public get membershipType(): number {
    return this._membershipType
  }

  private _membersCount: number

  public get membersCount(): number {
    return this._membersCount
  }

  private _isFavorite: boolean

  public get isFavorite(): boolean {
    return this._isFavorite
  }

  private _createdAt: string

  public get createdAt(): string {
    return this._createdAt
  }

  private _isOwner: boolean

  public get isOwner(): boolean {
    return this._isOwner
  }

  private _isAdmin: boolean

  public get isAdmin(): boolean {
    return this._isAdmin
  }

  private _ownerName: string

  public get ownerName(): string {
    return this._ownerName
  }

  private _flag: boolean

  public get flag(): boolean {
    return this._flag
  }

  private _canMembersDecorate: boolean

  public get canMembersDecorate(): boolean {
    return this._canMembersDecorate
  }

  private _pendingRequestsCount: number

  public get pendingRequestsCount(): number {
    return this._pendingRequestsCount
  }

  public flush(): boolean {
    this._id = 0
    this._type = 0
    this._title = null
    this._description = null
    this._badge = null
    this._roomId = 0
    this._roomName = null
    this._membershipType = 0
    this._membersCount = 0
    this._isFavorite = false
    this._createdAt = null
    this._isOwner = false
    this._isAdmin = false
    this._ownerName = null
    this._flag = false
    this._canMembersDecorate = false
    this._pendingRequestsCount = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._id = wrapper.readInt()
    wrapper.readBoolean()
    this._type = wrapper.readInt()
    this._title = wrapper.readString()
    this._description = wrapper.readString()
    this._badge = wrapper.readString()
    this._roomId = wrapper.readInt()
    this._roomName = wrapper.readString()
    this._membershipType = wrapper.readInt()
    this._membersCount = wrapper.readInt()
    this._isFavorite = wrapper.readBoolean()
    this._createdAt = wrapper.readString()
    this._isOwner = wrapper.readBoolean()
    this._isAdmin = wrapper.readBoolean()
    this._ownerName = wrapper.readString()
    this._flag = wrapper.readBoolean()
    this._canMembersDecorate = wrapper.readBoolean()
    this._pendingRequestsCount = wrapper.readInt()

    return true
  }
}
