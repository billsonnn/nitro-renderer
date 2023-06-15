export class GameAchievementData {
  constructor(gameTypeId: number, achievementId: number, achievementName: string, levels: number) {
    this._gameTypeId = gameTypeId
    this._achievementId = achievementId
    this._achievementName = achievementName
    this._levels = levels
  }

  private _gameTypeId: number

  public get gameTypeId(): number {
    return this._gameTypeId
  }

  private _achievementId: number

  public get achievementId(): number {
    return this._achievementId
  }

  private _achievementName: string

  public get achievementName(): string {
    return this._achievementName
  }

  private _levels: number

  public get levels(): number {
    return this._levels
  }
}
