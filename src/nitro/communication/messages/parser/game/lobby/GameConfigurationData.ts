export class GameConfigurationData {
  constructor(gameId: number, gameNameId: string, bgColor: number, textColor: number, assetUrl: string, supportUrl: string) {
    this._gameId = gameId
    this._gameNameId = gameNameId
    this._bgColor = bgColor
    this._textColor = textColor
    this._assetUrl = assetUrl
    this._supportUrl = supportUrl
  }

  private _gameId: number

  public get gameId(): number {
    return this._gameId
  }

  private _gameNameId: string

  public get gameNameId(): string {
    return this._gameNameId
  }

  private _bgColor: number

  public get bgColor(): number {
    return this._bgColor
  }

  private _textColor: number

  public get textColor(): number {
    return this._textColor
  }

  private _assetUrl: string

  public get assetUrl(): string {
    return this._assetUrl
  }

  private _supportUrl: string

  public get supportUrl(): string {
    return this._supportUrl
  }
}
