import { IMessageDataWrapper, IMessageParser } from '@/api'
import { QuestMessageData } from '@/nitro'

export class QuestCompletedMessageParser implements IMessageParser {
  private _questData: QuestMessageData

  public get questData(): QuestMessageData {
    return this._questData
  }

  private _showDialog: boolean

  public get showDialog(): boolean {
    return this._showDialog
  }

  public flush(): boolean {
    this._questData = null
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._questData = new QuestMessageData(wrapper)
    this._showDialog = wrapper.readBoolean()
    return true
  }
}
