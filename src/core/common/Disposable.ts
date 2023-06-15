import { IDisposable } from '@/api'

export class Disposable implements IDisposable {
  protected _isDisposed: boolean

  constructor() {
    this._isDisposed = false
    this._isDisposing = false
  }

  protected _isDisposing: boolean

  public get isDisposing(): boolean {
    return this._isDisposing
  }

  public get disposed(): boolean {
    return this._isDisposed
  }

  public dispose(): void {
    if (this._isDisposed || this._isDisposing) return

    this._isDisposing = true

    this.onDispose()

    this._isDisposed = true
    this._isDisposing = false
  }

  protected onDispose(): void {
    return
  }
}
