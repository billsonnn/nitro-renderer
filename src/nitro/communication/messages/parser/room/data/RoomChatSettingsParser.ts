import { IMessageDataWrapper, IMessageParser } from '@/api'
import { RoomChatSettings } from '@/nitro'

export class RoomChatSettingsParser implements IMessageParser {
  private _chat: RoomChatSettings

  public get chat(): RoomChatSettings {
    return this._chat
  }

  public flush(): boolean {
    this._chat = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._chat = new RoomChatSettings(wrapper)

    return true
  }
}
