import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { FurnitureFloorAddParser } from '@/nitro'

export class FurnitureFloorAddEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, FurnitureFloorAddParser)
  }

  public getParser(): FurnitureFloorAddParser {
    return this.parser as FurnitureFloorAddParser
  }
}
