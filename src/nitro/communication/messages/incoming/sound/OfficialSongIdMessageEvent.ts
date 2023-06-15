import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { OfficialSongIdMessageParser } from '@/nitro'

export class OfficialSongIdMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, OfficialSongIdMessageParser)
  }

  public getParser(): OfficialSongIdMessageParser {
    return this.parser as OfficialSongIdMessageParser
  }
}
