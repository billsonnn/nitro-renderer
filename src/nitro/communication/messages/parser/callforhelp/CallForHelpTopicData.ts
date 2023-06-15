import { IMessageDataWrapper } from '@/api'
import { INamed } from '@/nitro'

export class CallForHelpTopicData implements INamed {
  constructor(wrapper: IMessageDataWrapper) {
    this._name = wrapper.readString()
    this._id = wrapper.readInt()
    this._consequence = wrapper.readString()
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _consequence: string

  public get consequence(): string {
    return this._consequence
  }
}
