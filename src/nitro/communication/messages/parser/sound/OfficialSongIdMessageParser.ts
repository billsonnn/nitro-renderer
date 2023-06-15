import { IMessageDataWrapper, IMessageParser } from '@/api'

export class OfficialSongIdMessageParser implements IMessageParser {
  private _songId: number

  public get songId(): number {
    return this._songId
  }

  private _officialSongId: string

  public get officialSongId(): string {
    return this._officialSongId
  }

  flush(): boolean {
    this._songId = 0
    this._officialSongId = ''
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._officialSongId = wrapper.readString()
    this._songId = wrapper.readInt()
    return true
  }
}
