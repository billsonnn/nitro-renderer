import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PetExperienceParser implements IMessageParser {
  private _petId: number

  public get petId(): number {
    return this._petId
  }

  private _roomIndex: number

  public get roomIndex(): number {
    return this._roomIndex
  }

  private _gainedExperience: number

  public get gainedExperience(): number {
    return this._gainedExperience
  }

  public flush(): boolean {
    this._petId = -1
    this._roomIndex = -1
    this._gainedExperience = 0
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._petId = wrapper.readInt()
    this._roomIndex = wrapper.readInt()
    this._gainedExperience = wrapper.readInt()

    return true
  }
}
