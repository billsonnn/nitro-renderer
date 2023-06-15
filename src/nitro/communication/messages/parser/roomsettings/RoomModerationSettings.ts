import { IMessageDataWrapper, IRoomModerationSettings } from '@/api'

export class RoomModerationSettings implements IRoomModerationSettings {
  public static MODERATION_LEVEL_NONE: number = 0
  public static MODERATION_LEVEL_USER_WITH_RIGHTS: number = 1
  public static MODERATION_LEVEL_ALL: number = 2

  constructor(wrapper: IMessageDataWrapper) {
    this._allowMute = wrapper.readInt()
    this._allowKick = wrapper.readInt()
    this._allowBan = wrapper.readInt()
  }

  private _allowMute: number

  public get allowMute(): number {
    return this._allowMute
  }

  private _allowKick: number

  public get allowKick(): number {
    return this._allowKick
  }

  private _allowBan: number

  public get allowBan(): number {
    return this._allowBan
  }
}
