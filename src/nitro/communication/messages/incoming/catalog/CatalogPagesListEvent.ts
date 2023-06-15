import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CatalogIndexMessageParser } from '@/nitro'

export class CatalogPagesListEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CatalogIndexMessageParser)
  }

  public getParser(): CatalogIndexMessageParser {
    return this.parser as CatalogIndexMessageParser
  }
}
