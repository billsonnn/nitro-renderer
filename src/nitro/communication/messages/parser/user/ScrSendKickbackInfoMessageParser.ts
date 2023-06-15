import { IMessageDataWrapper, IMessageParser } from '@/api'
import { ScrKickbackData } from '@/nitro'

export class ScrSendKickbackInfoMessageParser implements IMessageParser {
  private _data: ScrKickbackData

  public get data(): ScrKickbackData {
    return this._data
  }

  flush(): boolean {
    this._data = null
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._data = new ScrKickbackData(wrapper)
    return true
  }
}
