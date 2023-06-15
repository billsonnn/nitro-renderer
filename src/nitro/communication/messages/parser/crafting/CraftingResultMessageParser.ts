import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CraftingResultObjectParser } from '@/nitro'

export class CraftingResultMessageParser implements IMessageParser {
  private _success: boolean

  public get success(): boolean {
    return this._success
  }

  private _result: CraftingResultObjectParser

  public get result(): CraftingResultObjectParser {
    return this._result
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false
    this._success = wrapper.readBoolean()
    if (this._success) {
      this._result = new CraftingResultObjectParser(wrapper)
    }
    return true
  }

  public flush(): boolean {
    this._success = false
    return true
  }
}
