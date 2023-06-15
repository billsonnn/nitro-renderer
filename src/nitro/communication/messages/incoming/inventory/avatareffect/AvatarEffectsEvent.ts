import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { AvatarEffectsParser } from '@/nitro'

export class AvatarEffectsEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, AvatarEffectsParser)
  }

  public getParser(): AvatarEffectsParser {
    return this.parser as AvatarEffectsParser
  }
}
