export class UserMessageData {
  public static M: string = 'M'
  public static F: string = 'F'
  private _isReadOnly: boolean = false

  constructor(k: number) {
    this._roomIndex = k
  }

  private _roomIndex: number = 0

  public get roomIndex(): number {
    return this._roomIndex
  }

  private _x: number = 0

  public get x(): number {
    return this._x
  }

  public set x(k: number) {
    if (!this._isReadOnly) {
      this._x = k
    }
  }

  private _y: number = 0

  public get y(): number {
    return this._y
  }

  public set y(k: number) {
    if (!this._isReadOnly) {
      this._y = k
    }
  }

  private _z: number = 0

  public get z(): number {
    return this._z
  }

  public set z(k: number) {
    if (!this._isReadOnly) {
      this._z = k
    }
  }

  private _dir: number = 0

  public get dir(): number {
    return this._dir
  }

  public set dir(k: number) {
    if (!this._isReadOnly) {
      this._dir = k
    }
  }

  private _name: string = ''

  public get name(): string {
    return this._name
  }

  public set name(k: string) {
    if (!this._isReadOnly) {
      this._name = k
    }
  }

  private _userType: number = 0

  public get userType(): number {
    return this._userType
  }

  public set userType(k: number) {
    if (!this._isReadOnly) {
      this._userType = k
    }
  }

  private _sex: string = ''

  public get sex(): string {
    return this._sex
  }

  public set sex(k: string) {
    if (!this._isReadOnly) {
      this._sex = k
    }
  }

  private _figure: string = ''

  public get figure(): string {
    return this._figure
  }

  public set figure(k: string) {
    if (!this._isReadOnly) {
      this._figure = k
    }
  }

  private _custom: string = ''

  public get custom(): string {
    return this._custom
  }

  public set custom(k: string) {
    if (!this._isReadOnly) {
      this._custom = k
    }
  }

  private _activityPoints: number = 0

  public get activityPoints(): number {
    return this._activityPoints
  }

  public set activityPoints(k: number) {
    if (!this._isReadOnly) {
      this._activityPoints = k
    }
  }

  private _webID: number = 0

  public get webID(): number {
    return this._webID
  }

  public set webID(k: number) {
    if (!this._isReadOnly) {
      this._webID = k
    }
  }

  private _groupID: number = 0

  public get groupID(): number {
    return this._groupID
  }

  public set groupID(groupId: number) {
    if (!this._isReadOnly) {
      this._groupID = groupId
    }
  }

  private _groupStatus: number = 0

  public get groupStatus(): number {
    return this._groupStatus
  }

  public set groupStatus(k: number) {
    if (!this._isReadOnly) {
      this._groupStatus = k
    }
  }

  private _groupName: string = ''

  public get groupName(): string {
    return this._groupName
  }

  public set groupName(k: string) {
    if (!this._isReadOnly) {
      this._groupName = k
    }
  }

  private _subType: string = ''

  public get subType(): string {
    return this._subType
  }

  public set subType(k: string) {
    if (!this._isReadOnly) {
      this._subType = k
    }
  }

  private _ownerId: number = 0

  public get ownerId(): number {
    return this._ownerId
  }

  public set ownerId(k: number) {
    if (!this._isReadOnly) {
      this._ownerId = k
    }
  }

  private _ownerName: string = ''

  public get ownerName(): string {
    return this._ownerName
  }

  public set ownerName(k: string) {
    if (!this._isReadOnly) {
      this._ownerName = k
    }
  }

  private _rarityLevel: number = 0

  public get rarityLevel(): number {
    return this._rarityLevel
  }

  public set rarityLevel(k: number) {
    if (!this._isReadOnly) {
      this._rarityLevel = k
    }
  }

  private _hasSaddle: boolean = false

  public get hasSaddle(): boolean {
    return this._hasSaddle
  }

  public set hasSaddle(k: boolean) {
    if (!this._isReadOnly) {
      this._hasSaddle = k
    }
  }

  private _isRiding: boolean = false

  public get isRiding(): boolean {
    return this._isRiding
  }

  public set isRiding(k: boolean) {
    if (!this._isReadOnly) {
      this._isRiding = k
    }
  }

  private _canBreed: boolean = false

  public get canBreed(): boolean {
    return this._canBreed
  }

  public set canBreed(k: boolean) {
    if (!this._isReadOnly) {
      this._canBreed = k
    }
  }

  private _canHarvest: boolean = false

  public get canHarvest(): boolean {
    return this._canHarvest
  }

  public set canHarvest(k: boolean) {
    if (!this._isReadOnly) {
      this._canHarvest = k
    }
  }

  private _canRevive: boolean = false

  public get canRevive(): boolean {
    return this._canRevive
  }

  public set canRevive(k: boolean) {
    if (!this._isReadOnly) {
      this._canRevive = k
    }
  }

  private _hasBreedingPermission: boolean = false

  public get hasBreedingPermission(): boolean {
    return this._hasBreedingPermission
  }

  public set hasBreedingPermission(k: boolean) {
    if (!this._isReadOnly) {
      this._hasBreedingPermission = k
    }
  }

  private _petLevel: number = 0

  public get petLevel(): number {
    return this._petLevel
  }

  public set petLevel(k: number) {
    if (!this._isReadOnly) {
      this._petLevel = k
    }
  }

  private _petPosture: string = ''

  public get petPosture(): string {
    return this._petPosture
  }

  public set petPosture(k: string) {
    if (!this._isReadOnly) {
      this._petPosture = k
    }
  }

  private _botSkills: number[] = []

  public get botSkills(): number[] {
    return this._botSkills
  }

  public set botSkills(k: number[]) {
    this._botSkills = k
  }

  private _isModerator: boolean = false

  public get isModerator(): boolean {
    return this._isModerator
  }

  public set isModerator(k: boolean) {
    if (!this._isReadOnly) {
      this._isModerator = k
    }
  }

  public setReadOnly(): void {
    this._isReadOnly = true
  }
}
