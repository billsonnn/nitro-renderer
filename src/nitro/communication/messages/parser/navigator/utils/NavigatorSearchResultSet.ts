import { IMessageDataWrapper } from '@/api'
import { NavigatorSearchResultList } from '@/nitro'

export class NavigatorSearchResultSet {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _code: string

  public get code(): string {
    return this._code
  }

  private _data: string

  public get data(): string {
    return this._data
  }

  private _results: NavigatorSearchResultList[]

  public get results(): NavigatorSearchResultList[] {
    return this._results
  }

  public flush(): boolean {
    this._code = null
    this._data = null
    this._results = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._code = wrapper.readString()
    this._data = wrapper.readString()

    let totalResults = wrapper.readInt()

    while (totalResults > 0) {
      this._results.push(new NavigatorSearchResultList(wrapper))

      totalResults--
    }

    return true
  }
}
