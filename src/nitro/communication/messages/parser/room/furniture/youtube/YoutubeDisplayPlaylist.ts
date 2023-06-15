export class YoutubeDisplayPlaylist {
  constructor(k: string, _arg_2: string, _arg_3: string) {
    this._video = k
    this._title = _arg_2
    this._description = _arg_3
  }

  private _video: string

  public get video(): string {
    return this._video
  }

  private _title: string

  public get title(): string {
    return this._title
  }

  private _description: string

  public get description(): string {
    return this._description
  }
}
