import { IMessageDataWrapper, IMessageParser } from '@/api'

export class UserFigureParser implements IMessageParser {
  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _gender: string

  public get gender(): string {
    return this._gender
  }

  public flush(): boolean {
    this._figure = null
    this._gender = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._figure = wrapper.readString()
    this._gender = wrapper.readString()

    return true
  }
}
