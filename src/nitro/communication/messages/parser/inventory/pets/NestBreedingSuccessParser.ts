import { IMessageDataWrapper, IMessageParser } from '@/api'

export class NestBreedingSuccessParser implements IMessageParser {
  private _rarityCategory: number

  public get rarityCategory(): number {
    return this._rarityCategory
  }

  private _petId: number

  public get petId(): number {
    return this._petId
  }

  public flush(): boolean {
    this._petId = -1
    this._rarityCategory = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    this._petId = wrapper.readInt()
    this._rarityCategory = wrapper.readInt()

    return true
  }
}
