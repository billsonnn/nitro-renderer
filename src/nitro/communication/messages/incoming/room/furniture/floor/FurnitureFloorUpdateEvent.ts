import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { FurnitureFloorUpdateParser } from '@/nitro'

export class FurnitureFloorUpdateEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, FurnitureFloorUpdateParser)
  }

  public getParser(): FurnitureFloorUpdateParser {
    return this.parser as FurnitureFloorUpdateParser
  }
}
