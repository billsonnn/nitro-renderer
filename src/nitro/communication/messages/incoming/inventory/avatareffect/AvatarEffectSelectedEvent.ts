import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { AvatarEffectSelectedParser } from '@/nitro'

export class AvatarEffectSelectedEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, AvatarEffectSelectedParser)
  }

  public getParser(): AvatarEffectSelectedParser {
    return this.parser as AvatarEffectSelectedParser
  }
}
