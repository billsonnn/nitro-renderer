import { IMessageDataWrapper, IMessageParser } from '@/api'
import { BreedingPetInfo, RarityCategoryData } from '@/nitro'

export class ConfirmBreedingRequestParser implements IMessageParser {
  private _nestId: number

  public get nestId(): number {
    return this._nestId
  }

  private _pet1: BreedingPetInfo

  public get pet1(): BreedingPetInfo {
    return this._pet1
  }

  private _pet2: BreedingPetInfo

  public get pet2(): BreedingPetInfo {
    return this._pet2
  }

  private _rarityCategories: RarityCategoryData[]

  public get rarityCategories(): RarityCategoryData[] {
    return this._rarityCategories
  }

  private _resultPetType: number

  public get resultPetType(): number {
    return this._resultPetType
  }

  public flush(): boolean {
    this._nestId = 0

    if (this._pet1) {
      this._pet1.dispose()
      this._pet1 = null
    }

    if (this._pet2) {
      this._pet2.dispose()
      this._pet2 = null
    }

    for (const k of this._rarityCategories) k && k.dispose()

    this._rarityCategories = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._nestId = wrapper.readInt()
    this._pet1 = new BreedingPetInfo(wrapper)
    this._pet2 = new BreedingPetInfo(wrapper)

    let totalCount = wrapper.readInt()

    while (totalCount > 0) {
      this._rarityCategories.push(new RarityCategoryData(wrapper))

      totalCount--
    }

    this._resultPetType = wrapper.readInt()

    return true
  }
}
