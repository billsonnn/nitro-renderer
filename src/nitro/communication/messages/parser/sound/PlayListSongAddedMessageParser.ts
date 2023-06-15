import { IMessageDataWrapper, IMessageParser } from '@/api'
import { PlayListEntry } from '@/nitro'

export class PlayListSongAddedMessageParser implements IMessageParser {
  private _entry: PlayListEntry

  public get entry(): PlayListEntry {
    return this._entry
  }

  flush(): boolean {
    this._entry = null
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._entry = new PlayListEntry(wrapper.readInt(), wrapper.readInt(), wrapper.readString(), wrapper.readString())
    return true
  }
}
