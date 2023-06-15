import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PetStatusUpdateParser implements IMessageParser {
  private _roomIndex: number

  public get roomIndex(): number {
    return this._roomIndex
  }

  private _petId: number

  public get petId(): number {
    return this._petId
  }

  private _canBreed: boolean

  public get canBreed(): boolean {
    return this._canBreed
  }

  private _canHarvest: boolean

  public get canHarvest(): boolean {
    return this._canHarvest
  }

  private _canRevive: boolean

  public get canRevive(): boolean {
    return this._canRevive
  }

  private _hasBreedingPermission: boolean

  public get hasBreedingPermission(): boolean {
    return this._hasBreedingPermission
  }

  public flush(): boolean {
    this._roomIndex = -1
    this._petId = -1
    this._canBreed = false
    this._canHarvest = false
    this._canRevive = false
    this._hasBreedingPermission = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomIndex = wrapper.readInt()
    this._petId = wrapper.readInt()
    this._canBreed = wrapper.readBoolean()
    this._canHarvest = wrapper.readBoolean()
    this._canRevive = wrapper.readBoolean()
    this._hasBreedingPermission = wrapper.readBoolean()

    return true
  }
}
