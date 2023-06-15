import { IMessageDataWrapper, IMessageParser } from '@/api'
import { PetData } from '@/nitro'

export class PetInventoryParser implements IMessageParser {
  protected _totalFragments: number

  public get totalFragments(): number {
    return this._totalFragments
  }

  protected _fragmentNumber: number

  public get fragmentNumber(): number {
    return this._fragmentNumber
  }

  private _fragment: Map<number, PetData>

  public get fragment(): Map<number, PetData> {
    return this._fragment
  }

  public flush(): boolean {
    this._fragment = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    this._totalFragments = wrapper.readInt()
    this._fragmentNumber = wrapper.readInt()

    let totalCount: number = wrapper.readInt()

    this._fragment = new Map()

    while (totalCount > 0) {
      const petData = new PetData(wrapper)

      this._fragment.set(petData.id, petData)

      totalCount--
    }

    return true
  }
}
