import { IMessageDataWrapper } from '@/api'

export class NavigatorSavedSearch {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _code: string

  public get code(): string {
    return this._code
  }

  private _filter: string

  public get filter(): string {
    return this._filter
  }

  private _localization: string

  public get localization(): string {
    return this._localization
  }

  public flush(): boolean {
    this._id = -1
    this._code = null
    this._filter = null
    this._localization = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._id = wrapper.readInt()
    this._code = wrapper.readString()
    this._filter = wrapper.readString()
    this._localization = wrapper.readString()

    return true
  }
}
