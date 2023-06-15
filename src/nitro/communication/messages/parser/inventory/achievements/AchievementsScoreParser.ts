import { IMessageDataWrapper, IMessageParser } from '@/api'

export class AchievementsScoreParser implements IMessageParser {
  private _score: number

  public get score(): number {
    return this._score
  }

  public flush(): boolean {
    this._score = 0

    return true
  }

  public parse(k: IMessageDataWrapper): boolean {
    if (!k) return false

    this._score = k.readInt()

    return true
  }
}
