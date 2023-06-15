import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PetSupplementedNotificationParser implements IMessageParser {
  private _petId: number

  public get petId(): number {
    return this._petId
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _supplementType: number

  public get supplementType(): number {
    return this._supplementType
  }

  public flush(): boolean {
    this._petId = 0
    this._userId = 0
    this._supplementType = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._petId = wrapper.readInt()
    this._userId = wrapper.readInt()
    this._supplementType = wrapper.readInt()

    return true
  }
}
