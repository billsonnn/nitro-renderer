import { IMessageDataWrapper } from '@/api'

export class GroupRank {
  public static readonly OWNER: number = 0
  public static readonly ADMIN: number = 1
  public static readonly MEMBER: number = 2
  public static readonly REQUESTED: number = 3
  public static readonly DELETED: number = 4
}

export class GroupMemberParser {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _rank: number

  public get rank(): number {
    return this._rank
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _joinedAt: string

  public get joinedAt(): string {
    return this._joinedAt
  }

  public flush(): boolean {
    this._rank = -1
    this._id = 0
    this._name = null
    this._figure = null
    this._joinedAt = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._rank = wrapper.readInt()
    this._id = wrapper.readInt()
    this._name = wrapper.readString()
    this._figure = wrapper.readString()
    this._joinedAt = wrapper.readString()

    return true
  }
}
