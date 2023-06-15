import { IMessageDataWrapper, IMessageParser } from '@/api'
import { RoomDataParser } from '../room'
import { RoomChatSettings, RoomModerationSettings } from '@/nitro'

export class GetGuestRoomResultMessageParser implements IMessageParser {
  private _roomEnter: boolean

  public get roomEnter(): boolean {
    return this._roomEnter
  }

  private _roomForward: boolean

  public get roomForward(): boolean {
    return this._roomForward
  }

  private _data: RoomDataParser

  public get data(): RoomDataParser {
    return this._data
  }

  private _staffPick: boolean

  public get staffPick(): boolean {
    return this._staffPick
  }

  private _isGroupMember: boolean

  public get isGroupMember(): boolean {
    return this._isGroupMember
  }

  private _moderation: RoomModerationSettings

  public get moderation(): RoomModerationSettings {
    return this._moderation
  }

  private _chat: RoomChatSettings

  public get chat(): RoomChatSettings {
    return this._chat
  }

  public flush(): boolean {
    this._roomEnter = false
    this._roomForward = false
    this._data = null
    this._staffPick = false
    this._isGroupMember = false
    this._moderation = null
    this._chat = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomEnter = wrapper.readBoolean()
    this._data = new RoomDataParser(wrapper)
    this._roomForward = wrapper.readBoolean()
    this._staffPick = wrapper.readBoolean()
    this._isGroupMember = wrapper.readBoolean()
    this.data.allInRoomMuted = wrapper.readBoolean()
    this._moderation = new RoomModerationSettings(wrapper)
    this.data.canMute = wrapper.readBoolean()
    this._chat = new RoomChatSettings(wrapper)

    return true
  }
}
