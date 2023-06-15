import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { AvatarEffectExpiredParser } from '@/nitro'

export class AvatarEffectExpiredEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, AvatarEffectExpiredParser)
  }

  public getParser(): AvatarEffectExpiredParser {
    return this.parser as AvatarEffectExpiredParser
  }
}
