import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { PetStatusUpdateParser } from '@/nitro'

export class PetStatusUpdateEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, PetStatusUpdateParser)
  }

  public getParser(): PetStatusUpdateParser {
    return this.parser as PetStatusUpdateParser
  }
}
