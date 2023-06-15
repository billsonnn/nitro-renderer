import { IMessageDataWrapper, IMessageParser } from '@/api'

export class TalentTrackLevelMessageParser implements IMessageParser {
  private _talentTrackName: string

  public get talentTrackName(): string {
    return this._talentTrackName
  }

  private _level: number

  public get level(): number {
    return this._level
  }

  private _maxLevel: number

  public get maxLevel(): number {
    return this._maxLevel
  }

  public flush(): boolean {
    this._talentTrackName = null
    this._level = -1
    this._maxLevel = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._talentTrackName = wrapper.readString()
    this._level = wrapper.readInt()
    this._maxLevel = wrapper.readInt()

    return true
  }
}
