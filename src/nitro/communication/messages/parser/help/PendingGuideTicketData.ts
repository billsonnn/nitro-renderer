export class PendingGuideTicketData {
  constructor(type: number, secondsAgo: number, isGuide: boolean, otherPartyName: string, otherPartyFigure: string, description: string, roomName: string) {
    this._type = type
    this._secondsAgo = secondsAgo
    this._isGuide = isGuide
    this._otherPartyName = otherPartyName
    this._otherPartyFigure = otherPartyFigure
    this._description = description
    this._roomName = roomName
  }

  private _type: number

  public get type(): number {
    return this._type
  }

  public set type(value: number) {
    this._type = value
  }

  private _secondsAgo: number

  public get secondsAgo(): number {
    return this._secondsAgo
  }

  public set secondsAgo(value: number) {
    this._secondsAgo = value
  }

  private _isGuide: boolean

  public get isGuide(): boolean {
    return this._isGuide
  }

  public set isGuide(value: boolean) {
    this._isGuide = value
  }

  private _otherPartyName: string

  public get otherPartyName(): string {
    return this._otherPartyName
  }

  public set otherPartyName(value: string) {
    this._otherPartyName = value
  }

  private _otherPartyFigure: string

  public get otherPartyFigure(): string {
    return this._otherPartyFigure
  }

  public set otherPartyFigure(value: string) {
    this._otherPartyFigure = value
  }

  private _description: string

  public get description(): string {
    return this._description
  }

  public set description(value: string) {
    this._description = value
  }

  private _roomName: string

  public get roomName(): string {
    return this._roomName
  }

  public set roomName(value: string) {
    this._roomName = value
  }
}
