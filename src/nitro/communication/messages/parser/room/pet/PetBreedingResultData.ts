import { IMessageDataWrapper, IPetBreedingResultData } from '@/api'

export class PetBreedingResultData implements IPetBreedingResultData {
  constructor(wrapper: IMessageDataWrapper) {
    this._stuffId = wrapper.readInt()
    this._classId = wrapper.readInt()
    this._productCode = wrapper.readString()
    this._userId = wrapper.readInt()
    this._userName = wrapper.readString()
    this._rarityLevel = wrapper.readInt()
    this._hasMutation = wrapper.readBoolean()
  }

  private _stuffId: number

  public get stuffId(): number {
    return this._stuffId
  }

  private _classId: number

  public get classId(): number {
    return this._classId
  }

  private _productCode: string

  public get productCode(): string {
    return this._productCode
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _userName: string

  public get userName(): string {
    return this._userName
  }

  private _rarityLevel: number

  public get rarityLevel(): number {
    return this._rarityLevel
  }

  private _hasMutation: boolean

  public get hasMutation(): boolean {
    return this._hasMutation
  }
}
