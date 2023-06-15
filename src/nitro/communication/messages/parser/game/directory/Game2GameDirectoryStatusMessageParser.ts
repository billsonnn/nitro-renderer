import { IMessageDataWrapper, IMessageParser } from '@/api'

export class Game2GameDirectoryStatusMessageParser implements IMessageParser {
  public static readonly STATUS_OK: number = 0
  public static readonly STATUS_FAILED_REASON_UNKNOWN: number = 1
  public static readonly STATUS_FAILED_REASON_GAME_DIRECTORY_IS_NOT_AVAILABLE: number = 2
  public static readonly STATUS_FAILED_REASON_HOTEL_IS_CLOSED: number = 3

  private _status: number

  public get status(): number {
    return this._status
  }

  private _blockLength: number

  public get blockLength(): number {
    return this._blockLength
  }

  private _gamesPlayed: number

  public get gamesPlayed(): number {
    return this._gamesPlayed
  }

  private _freeGamesLeft: number

  public get freeGamesLeft(): number {
    return this._freeGamesLeft
  }

  public get hasUnlimitedGames(): boolean {
    return this._freeGamesLeft == -1
  }

  public flush(): boolean {
    this._status = -1
    this._blockLength = -1
    this._gamesPlayed = -1
    this._freeGamesLeft = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._status = wrapper.readInt()
    this._blockLength = wrapper.readInt()
    this._gamesPlayed = wrapper.readInt()
    this._freeGamesLeft = wrapper.readInt()

    return true
  }
}
