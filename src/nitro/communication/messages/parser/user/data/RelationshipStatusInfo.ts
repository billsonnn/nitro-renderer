import { IMessageDataWrapper, RelationshipStatusEnum } from '@/api'

export class RelationshipStatusInfo {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _relationshipStatusType: number

  public get relationshipStatusType(): number {
    return this._relationshipStatusType
  }

  private _friendCount: number

  public get friendCount(): number {
    return this._friendCount
  }

  private _randomFriendId: number

  public get randomFriendId(): number {
    return this._randomFriendId
  }

  private _randomFriendName: string

  public get randomFriendName(): string {
    return this._randomFriendName
  }

  private _randomFriendFigure: string

  public get randomFriendFigure(): string {
    return this._randomFriendFigure
  }

  public flush(): boolean {
    this._relationshipStatusType = RelationshipStatusEnum.NONE
    this._friendCount = 0
    this._randomFriendId = 0
    this._randomFriendFigure = null
    this._randomFriendName = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._relationshipStatusType = wrapper.readInt()
    this._friendCount = wrapper.readInt()
    this._randomFriendId = wrapper.readInt()
    this._randomFriendName = wrapper.readString()
    this._randomFriendFigure = wrapper.readString()

    return true
  }
}
