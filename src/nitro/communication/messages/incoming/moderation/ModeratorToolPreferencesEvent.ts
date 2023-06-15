import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { ModeratorToolPreferencesMessageParser } from '@/nitro'

export class ModeratorToolPreferencesEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, ModeratorToolPreferencesMessageParser)
  }

  public getParser(): ModeratorToolPreferencesMessageParser {
    return this.parser as ModeratorToolPreferencesMessageParser
  }
}
