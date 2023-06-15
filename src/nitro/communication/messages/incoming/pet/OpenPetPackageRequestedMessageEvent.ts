import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { OpenPetPackageRequestedMessageParser } from '@/nitro'

export class OpenPetPackageRequestedMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, OpenPetPackageRequestedMessageParser)
  }

  public getParser(): OpenPetPackageRequestedMessageParser {
    return this.parser as OpenPetPackageRequestedMessageParser
  }
}
