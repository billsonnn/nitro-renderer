import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { ShowMysteryBoxWaitMessageParser } from '@/nitro'

export class ShowMysteryBoxWaitMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, ShowMysteryBoxWaitMessageParser)
  }

  public getParser(): ShowMysteryBoxWaitMessageParser {
    return this.parser as ShowMysteryBoxWaitMessageParser
  }
}
