import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FigureUpdateParser implements IMessageParser {
  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _gender: string

  public get gender(): string {
    return this._gender
  }

  public flush(): boolean {
    this._figure = ''
    this._gender = ''

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._figure = wrapper.readString()
    this._gender = wrapper.readString()

    if (this._gender) this._gender = this._gender.toUpperCase()

    return true
  }
}
