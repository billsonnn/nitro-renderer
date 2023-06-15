import { IMessageDataWrapper, IMessageParser } from '@/api'
import { YoutubeDisplayPlaylist } from '@/nitro'

export class YoutubeDisplayPlaylistsMessageParser implements IMessageParser {
  private _furniId: number

  public get furniId(): number {
    return this._furniId
  }

  private _playlists: YoutubeDisplayPlaylist[]

  public get playlists(): YoutubeDisplayPlaylist[] {
    return this._playlists
  }

  private _selectedPlaylistId: string

  public get selectedPlaylistId(): string {
    return this._selectedPlaylistId
  }

  flush(): boolean {
    this._furniId = -1
    this._playlists = null
    this._selectedPlaylistId = null
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._furniId = wrapper.readInt()
    const count = wrapper.readInt()
    this._playlists = []
    for (let i = 0; i < count; i++) {
      this._playlists.push(new YoutubeDisplayPlaylist(wrapper.readString(), wrapper.readString(), wrapper.readString()))
    }
    this._selectedPlaylistId = wrapper.readString()
    return true
  }
}
