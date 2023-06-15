import { IMessageDataWrapper } from '@/api'
import { Triggerable } from '@/nitro'

export class ConditionDefinition extends Triggerable {
  constructor(wrapper: IMessageDataWrapper) {
    super(wrapper)

    this._type = wrapper.readInt()
  }

  private _type: number

  public get type(): number {
    return this._type
  }

  public get code(): number {
    return this._type
  }
}
