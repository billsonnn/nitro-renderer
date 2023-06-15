import { IPetColorResult } from '@/api'

export class PetColorResult implements IPetColorResult {
  private static COLOR_TAGS: string[] = ['Null', 'Black', 'White', 'Grey', 'Red', 'Orange', 'Pink', 'Green', 'Lime', 'Blue', 'Light-Blue', 'Dark-Blue', 'Yellow', 'Brown', 'Dark-Brown', 'Beige', 'Cyan', 'Purple', 'Gold']

  constructor(primaryColor: number, secondaryColor: number, breed: number, tag: number, id: string, isMaster: boolean, layerTags: string[]) {
    this._layerTags = []
    this._primaryColor = (primaryColor & 0xFFFFFF)
    this._secondaryColor = (secondaryColor & 0xFFFFFF)
    this._breed = breed
    this._tag = (((tag > -1) && (tag < PetColorResult.COLOR_TAGS.length)) ? PetColorResult.COLOR_TAGS[tag] : '')
    this._id = id
    this._isMaster = isMaster
    this._layerTags = layerTags
  }

  private _breed: number

  public get breed(): number {
    return this._breed
  }

  private _tag: string

  public get tag(): string {
    return this._tag
  }

  private _id: string

  public get id(): string {
    return this._id
  }

  private _primaryColor: number

  public get primaryColor(): number {
    return this._primaryColor
  }

  private _secondaryColor: number

  public get secondaryColor(): number {
    return this._secondaryColor
  }

  private _isMaster: boolean

  public get isMaster(): boolean {
    return this._isMaster
  }

  private _layerTags: string[]

  public get layerTags(): string[] {
    return this._layerTags
  }
}
