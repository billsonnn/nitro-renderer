import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GroupConfirmMemberRemoveParser implements IMessageParser {
  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _furnitureCount: number

  public get furnitureCount(): number {
    return this._furnitureCount
  }

  flush(): boolean {
    this._userId = 0
    this._furnitureCount = 0

    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._userId = wrapper.readInt()
    this._furnitureCount = wrapper.readInt()

    return true
  }
}
