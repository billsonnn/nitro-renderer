import { BannedUserData } from '@/nitro'
import { FlatControllerData } from '@/nitro'
import { RoomChatSettings } from '@/nitro'
import { RoomModerationSettings } from '@/nitro'

export class RoomSettingsData {
  public static DOORMODE_OPEN: number = 0
  public static DOORMODE_CLOSED: number = 1
  public static DOORMODE_PASSWORD: number = 2
  public static DOORMODE_INVISIBLE: number = 3
  public static DOORMODE_NOOBS_ONLY: number = 4
  public static TRADEMODE_NOT_ALLOWED: number = 0
  public static TRADEMODE_WITH_CONTROLLER: number = 1
  public static TRADEMODE_ALLOWED: number = 2

  private _roomId: number = -1

  public get roomId(): number {
    return this._roomId
  }

  public set roomId(id: number) {
    this._roomId = id
  }

  private _name: string = null

  public get name(): string {
    return this._name
  }

  public set name(name: string) {
    this._name = name
  }

  private _description: string = null

  public get description(): string {
    return this._description
  }

  public set description(description: string) {
    this._description = description
  }

  private _doorMode: number = RoomSettingsData.DOORMODE_OPEN

  public get doorMode(): number {
    return this._doorMode
  }

  public set doorMode(mode: number) {
    this._doorMode = mode
  }

  private _categoryId: number = -1

  public get categoryId(): number {
    return this._categoryId
  }

  public set categoryId(id: number) {
    this._categoryId = id
  }

  private _maximumVisitors: number = 0

  public get maximumVisitors(): number {
    return this._maximumVisitors
  }

  public set maximumVisitors(max: number) {
    this._maximumVisitors = max
  }

  private _maximumVisitorsLimit: number = 0

  public get maximumVisitorsLimit(): number {
    return this._maximumVisitorsLimit
  }

  public set maximumVisitorsLimit(limit: number) {
    this._maximumVisitorsLimit = limit
  }

  private _tags: string[] = []

  public get tags(): string[] {
    return this._tags
  }

  public set tags(tags: string[]) {
    this._tags = tags
  }

  private _tradeMode: number = RoomSettingsData.TRADEMODE_NOT_ALLOWED

  public get tradeMode(): number {
    return this._tradeMode
  }

  public set tradeMode(mode: number) {
    this._tradeMode = mode
  }

  private _allowPets: boolean = false

  public get allowPets(): boolean {
    return this._allowPets
  }

  public set allowPets(flag: boolean) {
    this._allowPets = flag
  }

  private _allowFoodConsume: boolean = false

  public get allowFoodConsume(): boolean {
    return this._allowFoodConsume
  }

  public set allowFoodConsume(flag: boolean) {
    this._allowFoodConsume = flag
  }

  private _allowWalkThrough: boolean = false

  public get allowWalkThrough(): boolean {
    return this._allowWalkThrough
  }

  public set allowWalkThrough(flag: boolean) {
    this._allowWalkThrough = flag
  }

  private _hideWalls: boolean = false

  public get hideWalls(): boolean {
    return this._hideWalls
  }

  public set hideWalls(flag: boolean) {
    this._hideWalls = flag
  }

  private _wallThickness: number = 0

  public get wallThickness(): number {
    return this._wallThickness
  }

  public set wallThickness(thickness: number) {
    this._wallThickness = thickness
  }

  private _floorThickness: number = 0

  public get floorThickness(): number {
    return this._floorThickness
  }

  public set floorThickness(thickness: number) {
    this._floorThickness = thickness
  }

  private _controllersById: Map<number, FlatControllerData> = new Map()

  public get controllersById(): Map<number, FlatControllerData> {
    return this._controllersById
  }

  public set controllersById(controllers: Map<number, FlatControllerData>) {
    this._controllersById = controllers
  }

  private _controllerList: FlatControllerData[] = null

  public get controllerList(): FlatControllerData[] {
    if (!this._controllerList) {
      this._controllerList = []

      for (const controllerData of this._controllersById.values()) this._controllerList.push(controllerData)

      this._controllerList.sort((a, b) => a.userName.localeCompare(b.userName))
    }

    return this._controllerList
  }

  private _highlightedUserId: number = -1

  public get highlightedUserId(): number {
    return this._highlightedUserId
  }

  private _bannedUsersById: Map<number, BannedUserData> = new Map()

  public get bannedUsersById(): Map<number, BannedUserData> {
    return this._bannedUsersById
  }

  private _bannedUsersList: BannedUserData[] = null

  public get bannedUsersList(): BannedUserData[] {
    if (!this._bannedUsersList) {
      this._bannedUsersList = []

      for (const bannedUserData of this._bannedUsersById.values()) this._bannedUsersList.push(bannedUserData)

      this._bannedUsersList.sort((a, b) => a.userName.localeCompare(b.userName))
    }

    return this._bannedUsersList
  }

  private _roomModerationSettings: RoomModerationSettings = null

  public get roomModerationSettings(): RoomModerationSettings {
    return this._roomModerationSettings
  }

  public set roomModerationSettings(settings: RoomModerationSettings) {
    this._roomModerationSettings = settings
  }

  private _chatSettings: RoomChatSettings = null

  public get chatSettings(): RoomChatSettings {
    return this._chatSettings
  }

  public set chatSettings(settings: RoomChatSettings) {
    this._chatSettings = settings
  }

  private _allowNavigatorDynamicCats: boolean = false

  public get allowNavigatorDynamicCats(): boolean {
    return this._allowNavigatorDynamicCats
  }

  public set allowNavigatorDynamicCats(flag: boolean) {
    this._allowNavigatorDynamicCats = flag
  }

  public static from(settings: RoomSettingsData) {
    const instance = new RoomSettingsData()

    instance._roomId = settings._roomId
    instance._name = settings._name
    instance._description = settings._description
    instance._doorMode = settings._doorMode
    instance._categoryId = settings._categoryId
    instance._maximumVisitors = settings._maximumVisitors
    instance._maximumVisitorsLimit = settings._maximumVisitorsLimit
    instance._tags = settings._tags
    instance._tradeMode = settings._tradeMode
    instance._allowPets = settings._allowPets
    instance._allowFoodConsume = settings._allowFoodConsume
    instance._allowWalkThrough = settings._allowWalkThrough
    instance._hideWalls = settings._hideWalls
    instance._wallThickness = settings._wallThickness
    instance._floorThickness = settings._floorThickness
    instance._controllersById = settings._controllersById
    instance._controllerList = settings._controllerList
    instance._highlightedUserId = settings._highlightedUserId
    instance._bannedUsersById = settings._bannedUsersById
    instance._bannedUsersList = settings._bannedUsersList
    instance._roomModerationSettings = settings._roomModerationSettings
    instance._chatSettings = settings._chatSettings
    instance._allowNavigatorDynamicCats = settings._allowNavigatorDynamicCats

    return instance
  }

  public static getDoorModeLocalizationKey(k: number): string {
    switch (k) {
      case RoomSettingsData.DOORMODE_OPEN:
        return '${navigator.door.mode.open}'
      case RoomSettingsData.DOORMODE_CLOSED:
        return '${navigator.door.mode.closed}'
      case RoomSettingsData.DOORMODE_PASSWORD:
        return '${navigator.door.mode.password}'
      case RoomSettingsData.DOORMODE_INVISIBLE:
        return '${navigator.door.mode.invisible}'
      case RoomSettingsData.DOORMODE_NOOBS_ONLY:
        return '${navigator.door.mode.noobs_only}'
    }
    return ''
  }

  public setFlatController(id: number, data: FlatControllerData): void {
    this._controllersById.set(id, data)

    this._controllerList = null
    this._highlightedUserId = id
  }

  public setBannedUser(id: number, data: BannedUserData): void {
    this._bannedUsersById.set(id, data)

    this._bannedUsersList = null
  }
}
