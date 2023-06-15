import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { PetExperienceParser } from '@/nitro'

export class PetExperienceEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, PetExperienceParser)
  }

  public getParser(): PetExperienceParser {
    return this.parser as PetExperienceParser
  }
}
