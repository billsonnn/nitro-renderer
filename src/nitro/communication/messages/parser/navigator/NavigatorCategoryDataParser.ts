import { IMessageDataWrapper } from '@/api'

export class NavigatorCategoryDataParser {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _visible: boolean

  public get visible(): boolean {
    return this._visible
  }

  private _automatic: boolean

  public get automatic(): boolean {
    return this._automatic
  }

  private _automaticCategoryKey: string

  public get automaticCategoryKey(): string {
    return this._automaticCategoryKey
  }

  private _globalCategoryKey: string

  public get globalCategoryKey(): string {
    return this._globalCategoryKey
  }

  private _staffOnly: boolean

  public get staffOnly(): boolean {
    return this._staffOnly
  }

  public flush(): boolean {
    this._id = -1
    this._name = null
    this._visible = false
    this._automatic = false
    this._automaticCategoryKey = null
    this._globalCategoryKey = null
    this._staffOnly = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._id = wrapper.readInt()
    this._name = wrapper.readString()
    this._visible = wrapper.readBoolean()
    this._automatic = wrapper.readBoolean()
    this._automaticCategoryKey = wrapper.readString()
    this._globalCategoryKey = wrapper.readString()
    this._staffOnly = wrapper.readBoolean()

    return true
  }
}
