import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { FurnitureFloorParser } from '@/nitro'

export class FurnitureFloorEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, FurnitureFloorParser)
  }

  public getParser(): FurnitureFloorParser {
    return this.parser as FurnitureFloorParser
  }
}
