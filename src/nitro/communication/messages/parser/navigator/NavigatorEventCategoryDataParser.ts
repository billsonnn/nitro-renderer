import { IMessageDataWrapper } from '@/api'

export class NavigatorEventCategoryDataParser {
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

  public flush(): boolean {
    this._id = -1
    this._name = null
    this._visible = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._id = wrapper.readInt()
    this._name = wrapper.readString()
    this._visible = wrapper.readBoolean()

    return true
  }
}
