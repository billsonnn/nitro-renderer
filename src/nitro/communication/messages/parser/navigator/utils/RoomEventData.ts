import { IMessageDataWrapper } from '@/api'

export class RoomEventData {
  constructor(k: IMessageDataWrapper) {
    this._adId = k.readInt()
    this._ownerAvatarId = k.readInt()
    this._ownerAvatarName = k.readString()
    this._flatId = k.readInt()
    this._eventType = k.readInt()
    this._eventName = k.readString()
    this._eventDescription = k.readString()
    const _local_2 = k.readInt()
    const _local_3 = k.readInt()
    const _local_4: Date = new Date()
    let _local_5 = _local_4.getTime()
    const _local_6 = ((_local_2 * 60) * 1000)
    _local_5 = (_local_5 - _local_6)
    const _local_7: Date = new Date(_local_5)
    this._creationTime = ((((((((_local_7.getDate() + '-') + _local_7.getMonth()) + '-') + _local_7.getFullYear()) + ' ') + _local_7.getHours()) + ':') + _local_7.getMinutes())
    let _local_8 = _local_4.getTime()
    const _local_9 = ((_local_3 * 60) * 1000)
    _local_8 = (_local_8 + _local_9)
    this._expirationDate = new Date(_local_8)
    this._categoryId = k.readInt()
  }

  private _adId: number

  public get adId(): number {
    return this._adId
  }

  private _ownerAvatarId: number

  public get ownerAvatarId(): number {
    return this._ownerAvatarId
  }

  private _ownerAvatarName: string

  public get ownerAvatarName(): string {
    return this._ownerAvatarName
  }

  private _flatId: number

  public get flatId(): number {
    return this._flatId
  }

  private _categoryId: number

  public get categoryId(): number {
    return this._categoryId
  }

  private _eventType: number

  public get eventType(): number {
    return this._eventType
  }

  private _eventName: string

  public get eventName(): string {
    return this._eventName
  }

  private _eventDescription: string

  public get eventDescription(): string {
    return this._eventDescription
  }

  private _creationTime: string

  public get creationTime(): string {
    return this._creationTime
  }

  private _expirationDate: Date

  public get expirationDate(): Date {
    return this._expirationDate
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
  }
}
