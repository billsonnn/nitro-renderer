import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PollOfferParser implements IMessageParser {
  private _id = -1

  public get id(): number {
    return this._id
  }

  private _type = ''

  public get type(): string {
    return this._type
  }

  private _headline = ''

  public get headline(): string {
    return this._headline
  }

  private _summary = ''

  public get summary(): string {
    return this._summary
  }

  flush(): boolean {
    this._id = -1
    this._type = ''
    this._summary = ''
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._id = wrapper.readInt()
    this._type = wrapper.readString()
    this._headline = wrapper.readString()
    this._summary = wrapper.readString()
    return true
  }
}
