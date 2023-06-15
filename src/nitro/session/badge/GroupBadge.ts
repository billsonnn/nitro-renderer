import { GroupBadgePart } from '@/nitro'

export class GroupBadge {
  constructor(code: string) {
    this._code = code
    this._parts = []
  }

  private _code: string

  public get code(): string {
    return this._code
  }

  private _parts: GroupBadgePart[]

  public get parts(): GroupBadgePart[] {
    return this._parts
  }
}
