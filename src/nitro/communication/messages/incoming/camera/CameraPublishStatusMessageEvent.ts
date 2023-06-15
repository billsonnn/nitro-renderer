import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CameraPublishStatusMessageParser } from '@/nitro'

export class CameraPublishStatusMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CameraPublishStatusMessageParser)
  }

  public getParser(): CameraPublishStatusMessageParser {
    return this.parser as CameraPublishStatusMessageParser
  }
}
