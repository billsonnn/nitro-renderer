import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CatalogPageMessageParser } from '@/nitro'

export class CatalogPageMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CatalogPageMessageParser)
  }

  public getParser(): CatalogPageMessageParser {
    return this.parser as CatalogPageMessageParser
  }
}
