import { IMessageDataWrapper } from '@/api'
import { Triggerable } from '@/nitro'

export class TriggerDefinition extends Triggerable {
  private _triggerConf: number

  constructor(wrapper: IMessageDataWrapper) {
    super(wrapper)

    this._conflictingActions = []
    this._triggerConf = wrapper.readInt()

    let count = wrapper.readInt()

    while (count > 0) {
      this._conflictingActions.push(wrapper.readInt())

      count--
    }
  }

  private _conflictingActions: number[]

  public get conflictingActions(): number[] {
    return this._conflictingActions
  }

  public get code(): number {
    return this._triggerConf
  }
}
