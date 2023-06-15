import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PetBreedingMessageParser implements IMessageParser {
  public static STATE_CANCEL: number = 1
  public static STATE_ACCEPT: number = 2
  public static STATE_REQUEST: number = 3

  private _state: number

  public get state(): number {
    return this._state
  }

  private _ownPetId: number

  public get ownPetId(): number {
    return this._ownPetId
  }

  private _otherPetId: number

  public get otherPetId(): number {
    return this._otherPetId
  }

  public flush(): boolean {
    this._state = 0
    this._ownPetId = 0
    this._otherPetId = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._state = wrapper.readInt()
    this._ownPetId = wrapper.readInt()
    this._otherPetId = wrapper.readInt()

    return true
  }
}
