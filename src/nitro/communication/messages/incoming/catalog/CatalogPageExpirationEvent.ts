import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CatalogPageExpirationParser } from '@/nitro'

export class CatalogPageExpirationEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CatalogPageExpirationParser)
  }

  public getParser(): CatalogPageExpirationParser {
    return this.parser as CatalogPageExpirationParser
  }
}
