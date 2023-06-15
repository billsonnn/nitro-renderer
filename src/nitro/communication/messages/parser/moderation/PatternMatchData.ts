import { IDisposable, IMessageDataWrapper } from '@/api'

export class PatternMatchData implements IDisposable {
  constructor(k: IMessageDataWrapper) {
    this._pattern = k.readString()
    this._startIndex = k.readInt()
    this._endIndex = k.readInt()
  }

  private _pattern: string

  public get pattern(): string {
    return this._pattern
  }

  private _startIndex: number

  public get startIndex(): number {
    return this._startIndex
  }

  private _endIndex: number

  public get endIndex(): number {
    return this._endIndex
  }

  private _disposed: boolean = false

  public get disposed(): boolean {
    return this._disposed
  }

  public dispose(): void {
    this._disposed = true
    this._pattern = ''
    this._startIndex = -1
    this._endIndex = -1
  }
}
