import { IMessageDataWrapper } from '@/api'
import { NavigatorSavedSearch } from '@/nitro'

export class NavigatorTopLevelContext {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _code: string

  public get code(): string {
    return this._code
  }

  private _savedSearches: NavigatorSavedSearch[]

  public get savedSearches(): NavigatorSavedSearch[] {
    return this._savedSearches
  }

  public flush(): boolean {
    this._code = null
    this._savedSearches = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._code = wrapper.readString()

    let totalSavedSearches = wrapper.readInt()

    while (totalSavedSearches > 0) {
      this._savedSearches.push(new NavigatorSavedSearch(wrapper))

      totalSavedSearches--
    }

    return true
  }
}
