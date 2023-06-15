import { IMessageDataWrapper, IMessageParser } from '@/api'
import { TriggerDefinition } from '@/nitro'

export class WiredFurniTriggerParser implements IMessageParser {
  private _definition: TriggerDefinition

  public get definition(): TriggerDefinition {
    return this._definition
  }

  public flush(): boolean {
    this._definition = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._definition = new TriggerDefinition(wrapper)

    return true
  }
}
