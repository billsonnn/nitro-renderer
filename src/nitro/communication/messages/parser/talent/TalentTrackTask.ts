export class TalentTrackTask {
  constructor(id: number, requiredLevel: number, badgeCode: string, state: number, currentScore: number, totalScore: number) {
    this._id = id
    this._requiredLevel = requiredLevel
    this._badgeCode = badgeCode
    this._state = state
    this._currentScore = currentScore
    this._totalScore = totalScore
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _requiredLevel: number

  public get requiredLevel(): number {
    return this._requiredLevel
  }

  private _badgeCode: string

  public get badgeCode(): string {
    return this._badgeCode
  }

  private _state: number

  public get state(): number {
    return this._state
  }

  private _currentScore: number

  public get currentScore(): number {
    return this._currentScore
  }

  private _totalScore: number

  public get totalScore(): number {
    return this._totalScore
  }
}
