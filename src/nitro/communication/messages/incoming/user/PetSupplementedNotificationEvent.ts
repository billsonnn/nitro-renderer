import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { PetSupplementedNotificationParser } from '@/nitro'

export class PetSupplementedNotificationEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, PetSupplementedNotificationParser)
  }

  public getParser(): PetSupplementedNotificationParser {
    return this.parser as PetSupplementedNotificationParser
  }
}
