import { IMessageDataWrapper, IMessageParser } from '@/api'
import { PetData } from '@/nitro'

export class PetReceivedMessageParser implements IMessageParser {
  private _boughtAsGift: boolean

  public get boughtAsGift(): boolean {
    return this._boughtAsGift
  }

  private _pet: PetData

  public get pet(): PetData {
    return this._pet
  }

  public flush(): boolean {
    this._boughtAsGift = false
    this._pet = null

    return true
  }

  public parse(k: IMessageDataWrapper): boolean {
    this._boughtAsGift = k.readBoolean()
    this._pet = new PetData(k)

    return true
  }
}
