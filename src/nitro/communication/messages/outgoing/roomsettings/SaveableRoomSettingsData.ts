export class SaveableRoomSettingsData {
  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  public set roomId(id: number) {
    this._roomId = id
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  public set name(name: string) {
    this._name = name
  }

  private _description: string

  public get description(): string {
    return this._description
  }

  public set description(description: string) {
    this._description = description
  }

  private _doorMode: number

  public get doorMode(): number {
    return this._doorMode
  }

  public set doorMode(mode: number) {
    this._doorMode = mode
  }

  private _password: string

  public get password(): string {
    return this._password
  }

  public set password(password: string) {
    this._password = password
  }

  private _categoryId: number

  public get categoryId(): number {
    return this._categoryId
  }

  public set categoryId(id: number) {
    this._categoryId = id
  }

  private _maximumVisitors: number

  public get maximumVisitors(): number {
    return this._maximumVisitors
  }

  public set maximumVisitors(max: number) {
    this._maximumVisitors = max
  }

  private _tags: string[]

  public get tags(): string[] {
    return this._tags
  }

  public set tags(tags: string[]) {
    this._tags = tags
  }

  private _tradeMode: number

  public get tradeMode(): number {
    return this._tradeMode
  }

  public set tradeMode(mode: number) {
    this._tradeMode = mode
  }

  private _allowPets: boolean

  public get allowPets(): boolean {
    return this._allowPets
  }

  public set allowPets(flag: boolean) {
    this._allowPets = flag
  }

  private _allowFoodConsume: boolean

  public get allowFoodConsume(): boolean {
    return this._allowFoodConsume
  }

  public set allowFoodConsume(flag: boolean) {
    this._allowFoodConsume = flag
  }

  private _allowWalkThrough: boolean

  public get allowWalkThrough(): boolean {
    return this._allowWalkThrough
  }

  public set allowWalkThrough(flag: boolean) {
    this._allowWalkThrough = flag
  }

  private _allowNavigatorDynCats: boolean

  public get allowNavigatorDynCats(): boolean {
    return this._allowNavigatorDynCats
  }

  public set allowNavigatorDynCats(flag: boolean) {
    this._allowNavigatorDynCats = flag
  }

  private _hideWalls: boolean

  public get hideWalls(): boolean {
    return this._hideWalls
  }

  public set hideWalls(flag: boolean) {
    this._hideWalls = flag
  }

  private _wallThickness: number

  public get wallThickness(): number {
    return this._wallThickness
  }

  public set wallThickness(thickness: number) {
    this._wallThickness = thickness
  }

  private _floorThickness: number

  public get floorThickness(): number {
    return this._floorThickness
  }

  public set floorThickness(thickness: number) {
    this._floorThickness = thickness
  }

  private _whoCanMute: number

  public get whoCanMute(): number {
    return this._whoCanMute
  }

  public set whoCanMute(mute: number) {
    this._whoCanMute = mute
  }

  private _whoCanKick: number

  public get whoCanKick(): number {
    return this._whoCanKick
  }

  public set whoCanKick(kick: number) {
    this._whoCanKick = kick
  }

  private _whoCanBan: number

  public get whoCanBan(): number {
    return this._whoCanBan
  }

  public set whoCanBan(ban: number) {
    this._whoCanBan = ban
  }

  private _chatMode: number

  public get chatMode(): number {
    return this._chatMode
  }

  public set chatMode(mode: number) {
    this._chatMode = mode
  }

  private _chatBubbleSize: number

  public get chatBubbleSize(): number {
    return this._chatBubbleSize
  }

  public set chatBubbleSize(size: number) {
    this._chatBubbleSize = size
  }

  private _chatScrollUpFrequency: number

  public get chatScrollUpFrequency(): number {
    return this._chatScrollUpFrequency
  }

  public set chatScrollUpFrequency(frequency: number) {
    this._chatScrollUpFrequency = frequency
  }

  private _chatFullHearRange: number

  public get chatFullHearRange(): number {
    return this._chatFullHearRange
  }

  public set chatFullHearRange(range: number) {
    this._chatFullHearRange = range
  }

  private _chatFloodSensitivity: number

  public get chatFloodSensitivity(): number {
    return this._chatFloodSensitivity
  }

  public set chatFloodSensitivity(sensitivity: number) {
    this._chatFloodSensitivity = sensitivity
  }
}
