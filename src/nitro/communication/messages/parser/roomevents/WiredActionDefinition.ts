import { IMessageDataWrapper } from '@/api'
import { Triggerable } from '@/nitro'

export class WiredActionDefinition extends Triggerable {
  constructor(wrapper: IMessageDataWrapper) {
    super(wrapper)

    this._conflictingTriggers = []
    this._type = wrapper.readInt()
    this._delayInPulses = wrapper.readInt()

    let count = wrapper.readInt()

    while (count > 0) {
      this._conflictingTriggers.push(wrapper.readInt())

      count--
    }
  }

  private _type: number

  public get type(): number {
    return this._type
  }

  private _delayInPulses: number

  public get delayInPulses(): number {
    return this._delayInPulses
  }

  private _conflictingTriggers: number[]

  public get conflictingTriggers(): number[] {
    return this._conflictingTriggers
  }

  public get code(): number {
    return this._type
  }
}
