import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { SellablePetPalettesParser } from '@/nitro'

export class SellablePetPalettesMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, SellablePetPalettesParser)
  }

  public getParser(): SellablePetPalettesParser {
    return this.parser as SellablePetPalettesParser
  }
}
