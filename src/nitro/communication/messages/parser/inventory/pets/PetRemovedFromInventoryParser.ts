import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PetRemovedFromInventoryParser implements IMessageParser {
  private _petId: number

  public get petId(): number {
    return this._petId
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._petId = wrapper.readInt()

    return true
  }
}
