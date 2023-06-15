import { IEventDispatcher, INitroManager } from '@/api'
import { Disposable, EventDispatcher } from '@/core'

export class NitroManager extends Disposable implements INitroManager {
  constructor() {
    super()

    this._events = new EventDispatcher()

    this._isLoaded = false
    this._isLoading = false
  }

  private _events: IEventDispatcher

  public get events(): IEventDispatcher {
    return this._events
  }

  private _isLoaded: boolean

  public get isLoaded(): boolean {
    return this._isLoaded
  }

  private _isLoading: boolean

  public get isLoading(): boolean {
    return this._isLoading
  }

  public init(): void {
    if (this._isLoaded || this._isLoading || this.isDisposing) return

    this._isLoading = true

    this.onInit()

    this._isLoaded = true
    this._isLoading = false
  }

  public reload(): void {
    this.dispose()
    this.init()
  }

  protected onInit(): void {
    return
  }

  protected onDispose(): void {
    if (this._events) this._events.dispose()

    super.onDispose()
  }
}
