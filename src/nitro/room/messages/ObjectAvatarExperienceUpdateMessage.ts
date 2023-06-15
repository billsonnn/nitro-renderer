import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarExperienceUpdateMessage extends ObjectStateUpdateMessage {
  constructor(amount: number) {
    super()

    this._gainedExperience = amount
  }

  private _gainedExperience: number

  public get gainedExperience(): number {
    return this._gainedExperience
  }
}
