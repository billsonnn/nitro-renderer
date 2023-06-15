import { IMessageDataWrapper, IMessageParser } from '@/api'
import { QuestMessageData } from '@/nitro'

export class QuestDailyMessageParser implements IMessageParser {
  private _quest: QuestMessageData

  public get quest(): QuestMessageData {
    return this._quest
  }

  private _easyQuestCount: number

  public get easyQuestCount(): number {
    return this._easyQuestCount
  }

  private _hardQuestCount: number

  public get hardQuestCount(): number {
    return this._hardQuestCount
  }

  public flush(): boolean {
    this._quest = null
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    const _local_2 = wrapper.readBoolean()
    if (_local_2) {
      this._quest = new QuestMessageData(wrapper)
      this._easyQuestCount = wrapper.readInt()
      this._hardQuestCount = wrapper.readInt()
    }
    return true
  }
}
