import { IMessageDataWrapper } from '@/api'
import { PopularTagData } from '@/nitro'

export class PopularRoomTagsData {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _tags: PopularTagData[]

  public get tags(): PopularTagData[] {
    return this._tags
  }

  public flush(): boolean {
    this._tags = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._tags = []

    const totalTags = wrapper.readInt()

    let total = 0

    while (total < totalTags) {
      this._tags.push(new PopularTagData(wrapper))
      total++
    }

    return true
  }
}
