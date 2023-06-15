import { IMessageDataWrapper } from '@/api'

export class FriendCategoryData {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this._id = wrapper.readInt()
    this._name = wrapper.readString()
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _name: string

  public get name(): string {
    return this._name
  }
}
