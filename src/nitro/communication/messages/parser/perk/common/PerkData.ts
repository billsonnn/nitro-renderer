export class PerkData {
  constructor(code: string, errorMessage: string, isAllowed: boolean) {
    this._code = code
    this._errorMessage = errorMessage
    this._isAllowed = isAllowed
  }

  private _code: string

  public get code(): string {
    return this._code
  }

  private _errorMessage: string

  public get errorMessage(): string {
    return this._errorMessage
  }

  private _isAllowed: boolean

  public get isAllowed(): boolean {
    return this._isAllowed
  }
}
