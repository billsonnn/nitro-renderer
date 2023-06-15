import { IMessageDataWrapper, IMessageParser } from '@/api'

export class ConcurrentUsersGoalProgressMessageParser implements IMessageParser {
  private _state: number

  public get state(): number {
    return this._state
  }

  private _userCount: number

  public get userCount(): number {
    return this._userCount
  }

  private _userCountGoal: number

  public get userCountGoal(): number {
    return this._userCountGoal
  }

  public flush(): boolean {
    this._state = -1
    this._userCount = -1
    this._userCountGoal = -1
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._state = wrapper.readInt()
    this._userCount = wrapper.readInt()
    this._userCountGoal = wrapper.readInt()
    return true
  }
}
