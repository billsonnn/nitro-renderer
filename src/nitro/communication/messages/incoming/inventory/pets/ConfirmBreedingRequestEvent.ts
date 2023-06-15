import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { ConfirmBreedingRequestParser } from '@/nitro'

export class ConfirmBreedingRequestEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, ConfirmBreedingRequestParser)
  }

  public getParser(): ConfirmBreedingRequestParser {
    return this.parser as ConfirmBreedingRequestParser
  }
}
