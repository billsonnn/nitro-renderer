import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { PetPlacingErrorEventParser } from '@/nitro'

export class PetPlacingErrorEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, PetPlacingErrorEventParser)
  }

  public getParser(): PetPlacingErrorEventParser {
    return this.parser as PetPlacingErrorEventParser
  }
}
