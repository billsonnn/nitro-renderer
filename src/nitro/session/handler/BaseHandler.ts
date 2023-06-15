import { IConnection, IRoomHandlerListener } from '@/api'
import { Disposable } from '@/core'

export class BaseHandler extends Disposable {
  constructor(connection: IConnection, listener: IRoomHandlerListener) {
    super()

    this._connection = connection
    this._listener = listener
    this._roomId = 0
  }

  private _connection: IConnection

  public get connection(): IConnection {
    return this._connection
  }

  private _listener: IRoomHandlerListener

  public get listener(): IRoomHandlerListener {
    return this._listener
  }

  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  public setRoomId(id: number): void {
    this._roomId = id
  }

  protected onDispose(): void {
    this._connection = null
    this._listener = null
  }
}
