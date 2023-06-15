import { IMessageDataWrapper } from '@/api'

export class BotData {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_parser')

    this._id = wrapper.readInt()
    this._name = wrapper.readString()
    this._motto = wrapper.readString()
    this._gender = wrapper.readString()
    this._figure = wrapper.readString()
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _motto: string

  public get motto(): string {
    return this._motto
  }

  private _gender: string

  public get gender(): string {
    return this._gender
  }

  private _figure: string

  public get figure(): string {
    return this._figure
  }
}
