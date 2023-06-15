export class SongStartRequestData {
  constructor(songId: number, startPos: number, playLength: number, fadeInSeconds: number, fadeOutSeconds: number) {
    this._songId = songId
    this._startPos = startPos
    this._playLength = playLength
    this._fadeInSeconds = fadeInSeconds
    this._fadeOutSeconds = fadeOutSeconds
    this._playRequestTime = Date.now()
  }

  private _songId: number

  public get songId(): number {
    return this._songId
  }

  private _startPos: number

  public get startPos(): number {
    if (this._startPos < 0) return 0

    return this._startPos + ((Date.now() - this._playRequestTime) / 1000)
  }

  private _playLength: number

  public get playLength(): number {
    return this._playLength
  }

  private _playRequestTime: number

  public get playRequestTime(): number {
    return this._playRequestTime
  }

  private _fadeInSeconds: number

  public get fadeInSeconds(): number {
    return this._fadeInSeconds
  }

  private _fadeOutSeconds: number

  public get fadeOutSeconds(): number {
    return this._fadeOutSeconds
  }
}
