import { IMessageDataWrapper, IMessageParser } from '@/api'
import { WiredActionDefinition } from '@/nitro'

export class WiredFurniActionParser implements IMessageParser {
  private _definition: WiredActionDefinition

  public get definition(): WiredActionDefinition {
    return this._definition
  }

  public flush(): boolean {
    this._definition = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._definition = new WiredActionDefinition(wrapper)

    return true
  }
}
