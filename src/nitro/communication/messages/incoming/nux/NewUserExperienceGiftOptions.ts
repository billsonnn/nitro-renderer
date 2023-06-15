import { IMessageDataWrapper } from '@/api'
import { NewUserExperienceGift } from '@/nitro'

export class NewUserExperienceGiftOptions {
  constructor(wrapper: IMessageDataWrapper) {
    this._dayIndex = wrapper.readInt()
    this._stepIndex = wrapper.readInt()
    this._options = []

    const count: number = wrapper.readInt()
    let index = 0

    while (index < count) {
      this._options.push(new NewUserExperienceGift(wrapper))
      index++
    }
  }

  private _dayIndex: number

  public get dayIndex(): number {
    return this._dayIndex
  }

  private _stepIndex: number

  public get stepIndex(): number {
    return this._stepIndex
  }

  private _options: NewUserExperienceGift[]

  public get options(): NewUserExperienceGift[] {
    return this._options
  }
}
