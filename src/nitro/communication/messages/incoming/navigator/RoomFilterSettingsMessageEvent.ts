import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RoomFilterSettingsMessageParser } from '@/nitro'

export class RoomFilterSettingsMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RoomFilterSettingsMessageParser)
  }

  public getParser(): RoomFilterSettingsMessageParser {
    return this.parser as RoomFilterSettingsMessageParser
  }
}
