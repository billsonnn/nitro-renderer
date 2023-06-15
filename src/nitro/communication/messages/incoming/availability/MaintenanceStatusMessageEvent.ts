import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { MaintenanceStatusMessageParser } from '@/nitro'

export class MaintenanceStatusMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, MaintenanceStatusMessageParser)
  }

  public getParser(): MaintenanceStatusMessageParser {
    return this.parser as MaintenanceStatusMessageParser
  }
}
