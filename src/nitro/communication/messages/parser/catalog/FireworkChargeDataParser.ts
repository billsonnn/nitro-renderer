import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FireworkChargeData } from '@/nitro'

export class FireworkChargeDataParser implements IMessageParser {
  private _fireworkChargeData: FireworkChargeData

  public get fireworkChargeData(): FireworkChargeData {
    return this._fireworkChargeData
  }

  public flush(): boolean {
    this._fireworkChargeData = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._fireworkChargeData = new FireworkChargeData(wrapper)

    return true
  }
}
