import { IRoomUserData } from '@/api'

export class RoomUserData implements IRoomUserData {
  private _groupID: number = 0

  constructor(k: number) {
    this._roomIndex = k
  }

  private _roomIndex: number = -1

  public get roomIndex(): number {
    return this._roomIndex
  }

  private _name: string = ''

  public get name(): string {
    return this._name
  }

  public set name(k: string) {
    this._name = k
  }

  private _type: number = 0

  public get type(): number {
    return this._type
  }

  public set type(k: number) {
    this._type = k
  }

  private _sex: string = ''

  public get sex(): string {
    return this._sex
  }

  public set sex(k: string) {
    this._sex = k
  }

  private _figure: string = ''

  public get figure(): string {
    return this._figure
  }

  public set figure(k: string) {
    this._figure = k
  }

  private _custom: string = ''

  public get custom(): string {
    return this._custom
  }

  public set custom(k: string) {
    this._custom = k
  }

  private _activityPoints: number

  public get activityPoints(): number {
    return this._activityPoints
  }

  public set activityPoints(k: number) {
    this._activityPoints = k
  }

  private _webID: number = 0

  public get webID(): number {
    return this._webID
  }

  public set webID(k: number) {
    this._webID = k
  }

  private _groupStatus: number = 0

  public get groupStatus(): number {
    return this._groupStatus
  }

  public set groupStatus(k: number) {
    this._groupStatus = k
  }

  private _groupName: string = ''

  public get groupName(): string {
    return this._groupName
  }

  public set groupName(k: string) {
    this._groupName = k
  }

  private _ownerId: number = 0

  public get ownerId(): number {
    return this._ownerId
  }

  public set ownerId(k: number) {
    this._ownerId = k
  }

  private _ownerName: string = ''

  public get ownerName(): string {
    return this._ownerName
  }

  public set ownerName(k: string) {
    this._ownerName = k
  }

  private _petLevel: number = 0

  public get petLevel(): number {
    return this._petLevel
  }

  public set petLevel(k: number) {
    this._petLevel = k
  }

  private _rarityLevel: number = 0

  public get rarityLevel(): number {
    return this._rarityLevel
  }

  public set rarityLevel(k: number) {
    this._rarityLevel = k
  }

  private _hasSaddle: boolean

  public get hasSaddle(): boolean {
    return this._hasSaddle
  }

  public set hasSaddle(k: boolean) {
    this._hasSaddle = k
  }

  private _isRiding: boolean

  public get isRiding(): boolean {
    return this._isRiding
  }

  public set isRiding(k: boolean) {
    this._isRiding = k
  }

  private _canBreed: boolean

  public get canBreed(): boolean {
    return this._canBreed
  }

  public set canBreed(k: boolean) {
    this._canBreed = k
  }

  private _canHarvest: boolean

  public get canHarvest(): boolean {
    return this._canHarvest
  }

  public set canHarvest(k: boolean) {
    this._canHarvest = k
  }

  private _canRevive: boolean

  public get canRevive(): boolean {
    return this._canRevive
  }

  public set canRevive(k: boolean) {
    this._canRevive = k
  }

  private _hasBreedingPermission: boolean

  public get hasBreedingPermission(): boolean {
    return this._hasBreedingPermission
  }

  public set hasBreedingPermission(k: boolean) {
    this._hasBreedingPermission = k
  }

  private _botSkills: number[]

  public get botSkills(): number[] {
    return this._botSkills
  }

  public set botSkills(k: number[]) {
    this._botSkills = k
  }

  private _isModerator: boolean

  public get isModerator(): boolean {
    return this._isModerator
  }

  public set isModerator(k: boolean) {
    this._isModerator = k
  }

  public get groupId(): number {
    return this._groupID
  }

  public set groupId(groupId: number) {
    this._groupID = groupId
  }
}
