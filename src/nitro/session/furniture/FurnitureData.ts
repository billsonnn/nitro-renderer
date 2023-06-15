import { IFurnitureData } from '@/api'

export class FurnitureData implements IFurnitureData {
  private _colourIndex: number
  private _localizedName: string
  private _excludedFromDynamic: boolean

  constructor(type: string, id: number, fullName: string, className: string, category: string, localizedName: string, description: string, revision: number, tileSizeX: number, tileSizeY: number, tileSizeZ: number, colors: number[], hadIndexedColor: boolean, colorIndex: number, adUrl: string, purchaseOfferId: number, purchaseCouldBeUsedForBuyout: boolean, rentOfferId: number, rentCouldBeUsedForBuyout: boolean, availableForBuildersClub: boolean, customParams: string, specialType: number, canStandOn: boolean, canSitOn: boolean, canLayOn: boolean, excludedfromDynamic: boolean, furniLine: string, environment: string, rare: boolean) {
    this._type = type
    this._id = id
    this._fullName = fullName
    this._className = className
    this._category = category
    this._revision = revision
    this._tileSizeX = tileSizeX
    this._tileSizeY = tileSizeY
    this._tileSizeZ = tileSizeZ
    this._colors = colors
    this._hasIndexedColor = hadIndexedColor
    this._colourIndex = colorIndex
    this._localizedName = localizedName
    this._description = description
    this._adUrl = adUrl
    this._purchaseOfferId = purchaseOfferId
    this._purchaseCouldBeUsedForBuyout = purchaseCouldBeUsedForBuyout
    this._rentOfferId = rentOfferId
    this._rentCouldBeUsedForBuyout = rentCouldBeUsedForBuyout
    this._customParams = customParams
    this._specialType = specialType
    this._availableForBuildersClub = availableForBuildersClub
    this._canStandOn = canStandOn
    this._canSitOn = canSitOn
    this._canLayOn = canLayOn
    this._excludedFromDynamic = excludedfromDynamic
    this._furniLine = furniLine
    this._environment = environment
    this._rare = rare
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _className: string

  public get className(): string {
    return this._className
  }

  public set className(k: string) {
    this._className = k
  }

  private _fullName: string

  public get fullName(): string {
    return this._fullName
  }

  private _category: string

  public get category(): string {
    return this._category
  }

  private _hasIndexedColor: boolean

  public get hasIndexedColor(): boolean {
    return this._hasIndexedColor
  }

  private _revision: number

  public get revision(): number {
    return this._revision
  }

  private _tileSizeX: number

  public get tileSizeX(): number {
    return this._tileSizeX
  }

  private _tileSizeY: number

  public get tileSizeY(): number {
    return this._tileSizeY
  }

  private _tileSizeZ: number

  public get tileSizeZ(): number {
    return this._tileSizeZ
  }

  private _colors: number[]

  public get colors(): number[] {
    return this._colors
  }

  private _description: string

  public get description(): string {
    return this._description
  }

  private _adUrl: string

  public get adUrl(): string {
    return this._adUrl
  }

  private _purchaseOfferId: number

  public get purchaseOfferId(): number {
    return this._purchaseOfferId
  }

  private _rentOfferId: number

  public get rentOfferId(): number {
    return this._rentOfferId
  }

  private _customParams: string

  public get customParams(): string {
    return this._customParams
  }

  private _specialType: number

  public get specialType(): number {
    return this._specialType
  }

  private _purchaseCouldBeUsedForBuyout: boolean

  public get purchaseCouldBeUsedForBuyout(): boolean {
    return this._purchaseCouldBeUsedForBuyout
  }

  private _rentCouldBeUsedForBuyout: boolean

  public get rentCouldBeUsedForBuyout(): boolean {
    return this._rentCouldBeUsedForBuyout
  }

  private _availableForBuildersClub: boolean

  public get availableForBuildersClub(): boolean {
    return this._availableForBuildersClub
  }

  private _canStandOn: boolean

  public get canStandOn(): boolean {
    return this._canStandOn
  }

  private _canSitOn: boolean

  public get canSitOn(): boolean {
    return this._canSitOn
  }

  private _canLayOn: boolean

  public get canLayOn(): boolean {
    return this._canLayOn
  }

  private _furniLine: string

  public get furniLine(): string {
    return this._furniLine
  }

  private _environment: string

  public get environment(): string {
    return this._environment
  }

  private _rare: boolean

  public get rare(): boolean {
    return this._rare
  }

  public get colorIndex(): number {
    return this._colourIndex
  }

  public get name(): string {
    return this._localizedName
  }

  public get isExternalImage(): boolean {
    return !(this._className.indexOf('external_image') === -1)
  }

  public get excludeDynamic(): boolean {
    return this._excludedFromDynamic
  }
}
