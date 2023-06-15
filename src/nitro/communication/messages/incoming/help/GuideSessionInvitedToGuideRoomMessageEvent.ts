import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { GuideSessionInvitedToGuideRoomMessageParser } from '@/nitro'

export class GuideSessionInvitedToGuideRoomMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, GuideSessionInvitedToGuideRoomMessageParser)
  }

  public getParser(): GuideSessionInvitedToGuideRoomMessageParser {
    return this.parser as GuideSessionInvitedToGuideRoomMessageParser
  }
}
