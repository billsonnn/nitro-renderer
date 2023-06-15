export class ObjectMouseData {
  constructor() {
    this._objectId = ''
    this._spriteTag = ''
  }

  private _objectId: string

  public get objectId(): string {
    return this._objectId
  }

  public set objectId(k: string) {
    this._objectId = k
  }

  private _spriteTag: string

  public get spriteTag(): string {
    return this._spriteTag
  }

  public set spriteTag(k: string) {
    this._spriteTag = k
  }
}
