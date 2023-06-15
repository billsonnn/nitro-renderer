import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { FurnitureListInvalidateParser } from '@/nitro'

export class FurnitureListInvalidateEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, FurnitureListInvalidateParser)
  }

  public getParser(): FurnitureListInvalidateParser {
    return this.parser as FurnitureListInvalidateParser
  }
}
