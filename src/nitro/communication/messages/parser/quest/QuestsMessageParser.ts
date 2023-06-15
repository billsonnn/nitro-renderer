import { IMessageDataWrapper, IMessageParser } from '@/api'
import { QuestMessageData } from '@/nitro'

export class QuestsMessageParser implements IMessageParser {
  private _quests: QuestMessageData[]

  public get quests(): QuestMessageData[] {
    return this._quests
  }

  private _openWindow: boolean

  public get openWindow(): boolean {
    return this._openWindow
  }

  public flush(): boolean {
    this._quests = []
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    const count = wrapper.readInt()

    for (let i = 0; i < count; i++) {
      this._quests.push(new QuestMessageData(wrapper))
    }

    this._openWindow = wrapper.readBoolean()
    return true
  }
}
