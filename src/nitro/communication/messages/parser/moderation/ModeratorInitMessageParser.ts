import { IMessageDataWrapper, IMessageParser } from '@/api'
import { ModeratorInitData } from '@/nitro'

export class ModeratorInitMessageParser implements IMessageParser {
  private _data: ModeratorInitData = null

  public get data(): ModeratorInitData {
    return this._data
  }

  public flush(): boolean {
    this._data = null
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    this._data = new ModeratorInitData(wrapper)
    return true
  }
}
