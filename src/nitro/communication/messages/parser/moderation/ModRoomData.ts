import { IDisposable, IMessageDataWrapper } from '@/api'

export class ModRoomData implements IDisposable {
  constructor(k: IMessageDataWrapper) {
    this._tags = []
    this._exists = k.readBoolean()
    if (!this.exists) {
      return
    }
    this._name = k.readString()
    this._desc = k.readString()

    const tagCount = k.readInt()

    for (let i = 0; i < tagCount; i++) {
      this._tags.push(k.readString())
    }
  }

  private _exists: boolean

  public get exists(): boolean {
    return this._exists
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _desc: string

  public get desc(): string {
    return this._desc
  }

  private _tags: string[]

  public get tags(): string[] {
    return this._tags
  }

  private _disposed: boolean

  public get disposed(): boolean {
    return this._disposed
  }

  public dispose(): void {
    if (this._disposed) {
      return
    }
    this._disposed = true
    this._tags = null
  }
}
