import { IMessageDataWrapper, IMessageParser } from '@/api'
import { QuestMessageData } from '@/nitro'

export class QuestMessageParser implements IMessageParser {
  private _quest: QuestMessageData

  public get quest(): QuestMessageData {
    return this._quest
  }

  public flush(): boolean {
    this._quest = null
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._quest = new QuestMessageData(wrapper)
    return true
  }
}
