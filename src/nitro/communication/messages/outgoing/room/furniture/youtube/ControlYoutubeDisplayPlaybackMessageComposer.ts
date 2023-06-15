import { IMessageComposer } from '@/api'

export class ControlYoutubeDisplayPlaybackMessageComposer implements IMessageComposer<ConstructorParameters<typeof ControlYoutubeDisplayPlaybackMessageComposer>> {
  private _data: ConstructorParameters<typeof ControlYoutubeDisplayPlaybackMessageComposer>

  constructor(k: number, _arg_2: number) {
    this._data = [k, _arg_2]
  }

  public getMessageArray() {
    return this._data
  }

  public dispose(): void {
    return
  }
}
