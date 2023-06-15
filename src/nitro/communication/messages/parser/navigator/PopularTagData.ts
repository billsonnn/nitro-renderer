import { IMessageDataWrapper } from '@/api'

export class PopularTagData {
  constructor(wrapper: IMessageDataWrapper) {
    this._tagName = wrapper.readString()
    this._userCount = wrapper.readInt()
  }

  private _tagName: string

  public get tagName(): string {
    return this._tagName
  }

  private _userCount: number

  public get userCount(): number {
    return this._userCount
  }
}
