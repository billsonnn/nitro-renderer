import { IMessageDataWrapper, IMessageParser } from '@/api'
import { ExtendedForumData } from '@/nitro'

export class ForumDataMessageParser implements IMessageParser {
  private _extendedForumData: ExtendedForumData

  public get extendedForumData(): ExtendedForumData {
    return this._extendedForumData
  }

  public flush(): boolean {
    this._extendedForumData = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._extendedForumData = ExtendedForumData.parse(wrapper)

    return true
  }
}
