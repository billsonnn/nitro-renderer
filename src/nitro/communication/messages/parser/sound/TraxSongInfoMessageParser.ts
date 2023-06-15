import { IMessageDataWrapper, IMessageParser } from '@/api'
import { SongInfoEntry } from '@/nitro'

export class TraxSongInfoMessageParser implements IMessageParser {
  private _songs: SongInfoEntry[]

  public get songs(): SongInfoEntry[] {
    return this._songs
  }

  flush(): boolean {
    this._songs = []
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    const count = wrapper.readInt()
    for (let i = 0; i < count; i++) {
      const id = wrapper.readInt()
      const _local_3 = wrapper.readString()
      const name = wrapper.readString()
      const data = wrapper.readString()
      const length = wrapper.readInt()
      const creator = wrapper.readString()
      const _local_10 = new SongInfoEntry(id, length, name, creator, data)
      this._songs.push(_local_10)
    }
    return true
  }
}
