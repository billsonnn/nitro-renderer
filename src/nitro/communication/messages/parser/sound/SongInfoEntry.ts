import { PlayListEntry } from '@/nitro'

export class SongInfoEntry extends PlayListEntry {
  constructor(id: number, length: number, name: string, creator: string, data: string) {
    super(id, length, name, creator)
    this._data = data
  }

  private _data: string = ''

  public get data(): string {
    return this._data
  }
}
