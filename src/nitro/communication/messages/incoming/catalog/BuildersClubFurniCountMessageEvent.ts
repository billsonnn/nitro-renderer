import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { BuildersClubFurniCountMessageParser } from '@/nitro'

export class BuildersClubFurniCountMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, BuildersClubFurniCountMessageParser)
  }

  public getParser(): BuildersClubFurniCountMessageParser {
    return this.parser as BuildersClubFurniCountMessageParser
  }
}
