import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { WelcomeGiftChangeEmailResultParser } from '@/nitro'

export class WelcomeGiftChangeEmailResultEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, WelcomeGiftChangeEmailResultParser)
  }

  public getParser(): WelcomeGiftChangeEmailResultParser {
    return this.parser as WelcomeGiftChangeEmailResultParser
  }
}
