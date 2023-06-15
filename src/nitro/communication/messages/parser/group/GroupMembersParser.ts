import { IMessageDataWrapper, IMessageParser } from '@/api'
import { GroupMemberParser } from './utils'

export class GroupMembersParser implements IMessageParser {
  private _groupId: number

  public get groupId(): number {
    return this._groupId
  }

  private _groupTitle: string

  public get groupTitle(): string {
    return this._groupTitle
  }

  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _badge: string

  public get badge(): string {
    return this._badge
  }

  private _totalMembersCount: number

  public get totalMembersCount(): number {
    return this._totalMembersCount
  }

  private _result: GroupMemberParser[]

  public get result(): GroupMemberParser[] {
    return this._result
  }

  private _admin: boolean

  public get admin(): boolean {
    return this._admin
  }

  private _pageSize: number

  public get pageSize(): number {
    return this._pageSize
  }

  private _pageIndex: number

  public get pageIndex(): number {
    return this._pageIndex
  }

  private _level: number

  public get level(): number {
    return this._level
  }

  private _query: string

  public get query(): string {
    return this._query
  }

  public flush(): boolean {
    this._groupId = 0
    this._groupTitle = null
    this._roomId = 0
    this._badge = null
    this._totalMembersCount = 0
    this._result = []
    this._admin = false
    this._pageSize = 0
    this._pageIndex = 0
    this._level = 0
    this._query = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._groupId = wrapper.readInt()
    this._groupTitle = wrapper.readString()
    this._roomId = wrapper.readInt()
    this._badge = wrapper.readString()
    this._totalMembersCount = wrapper.readInt()

    let resultCount = wrapper.readInt()

    while (resultCount > 0) {
      this._result.push(new GroupMemberParser(wrapper))

      resultCount--
    }

    this._admin = wrapper.readBoolean()
    this._pageSize = wrapper.readInt()
    this._pageIndex = wrapper.readInt()
    this._level = wrapper.readInt()
    this._query = wrapper.readString()

    return true
  }
}
