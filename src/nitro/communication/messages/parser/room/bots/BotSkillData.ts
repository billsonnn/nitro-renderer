import { IMessageDataWrapper } from '@/api'

export class BotSkillData {
  constructor(wrapper: IMessageDataWrapper) {
    this._id = wrapper.readInt()
    this._data = wrapper.readString()
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _data: string

  public get data(): string {
    return this._data
  }
}
