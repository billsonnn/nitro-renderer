import { IMessageDataWrapper, IMessageParser } from '@/api'
import { GuildForumThread } from '@/nitro'

export class GuildForumThreadsParser implements IMessageParser {
  private _groupId: number

  public get groupId(): number {
    return this._groupId
  }

  private _startIndex: number

  public get startIndex(): number {
    return this._startIndex
  }

  private _amount: number

  public get amount(): number {
    return this._amount
  }

  private _threads: GuildForumThread[]

  public get threads(): GuildForumThread[] {
    return this._threads
  }

  public flush(): boolean {
    this._groupId = -1
    this._startIndex = -1
    this._amount = 0
    this._threads = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._groupId = wrapper.readInt()
    this._startIndex = wrapper.readInt()
    this._amount = wrapper.readInt()
    this._threads = []

    let i = 0

    while (i < this._amount) {
      this._threads.push(GuildForumThread.parse(wrapper))

      i++
    }

    return true
  }
}
