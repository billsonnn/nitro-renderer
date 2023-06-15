import { IMessageDataWrapper, IMessageParser } from '@/api'
import { MessageData } from '@/nitro'

export class ThreadMessagesMessageParser implements IMessageParser {
  private _groupId: number

  public get groupId(): number {
    return this._groupId
  }

  private _threadId: number

  public get threadId(): number {
    return this._threadId
  }

  private _startIndex: number

  public get startIndex(): number {
    return this._startIndex
  }

  private _amount: number

  public get amount(): number {
    return this._amount
  }

  private _messages: MessageData[]

  public get messages(): MessageData[] {
    return this._messages
  }

  public flush(): boolean {
    this._groupId = -1
    this._threadId = -1
    this._startIndex = -1
    this._amount = 0
    this._messages = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._groupId = wrapper.readInt()
    this._threadId = wrapper.readInt()
    this._startIndex = wrapper.readInt()
    this._amount = wrapper.readInt()
    this._messages = []

    let i = 0

    while (i < this._amount) {
      const message = MessageData.parse(wrapper)

      message.groupID = this._groupId
      message.threadId = this._threadId

      this._messages.push(message)

      i++
    }

    return true
  }
}
