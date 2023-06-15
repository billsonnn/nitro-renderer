import { IMessageDataWrapper, IMessageParser } from '@/api'
import { GameRewardWinnerEntry } from '@/nitro'

export class WeeklyGameRewardWinnersParser implements IMessageParser {
  private _gameTypeId: number

  public get gameTypeId(): number {
    return this._gameTypeId
  }

  private _winners: GameRewardWinnerEntry[]

  public get winners(): GameRewardWinnerEntry[] {
    return this._winners
  }

  public flush(): boolean {
    this._gameTypeId = -1
    this._winners = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._gameTypeId = wrapper.readInt()
    let totalWinners: number = wrapper.readInt()

    while (totalWinners > 0) {
      this._winners.push(new GameRewardWinnerEntry(wrapper))
      totalWinners--
    }

    return true
  }
}
