import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { FurnitureWallRemoveParser } from '@/nitro'

export class FurnitureWallRemoveEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, FurnitureWallRemoveParser)
  }

  public getParser(): FurnitureWallRemoveParser {
    return this.parser as FurnitureWallRemoveParser
  }
}
