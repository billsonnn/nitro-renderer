import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { WiredValidationErrorParser } from '@/nitro'

export class WiredValidationErrorEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, WiredValidationErrorParser)
  }

  public getParser(): WiredValidationErrorParser {
    return this.parser as WiredValidationErrorParser
  }
}
