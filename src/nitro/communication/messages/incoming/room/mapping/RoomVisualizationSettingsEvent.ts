import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RoomVisualizationSettingsParser } from '@/nitro'

export class RoomVisualizationSettingsEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RoomVisualizationSettingsParser)
  }

  public getParser(): RoomVisualizationSettingsParser {
    return this.parser as RoomVisualizationSettingsParser
  }
}
