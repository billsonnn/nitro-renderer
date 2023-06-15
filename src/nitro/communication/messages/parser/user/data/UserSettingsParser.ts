import { IMessageDataWrapper, IMessageParser } from '@/api'

export class UserSettingsParser implements IMessageParser {
  private _volumeSystem: number

  public get volumeSystem(): number {
    return this._volumeSystem
  }

  private _volumeFurni: number

  public get volumeFurni(): number {
    return this._volumeFurni
  }

  private _volumeTrax: number

  public get volumeTrax(): number {
    return this._volumeTrax
  }

  private _oldChat: boolean

  public get oldChat(): boolean {
    return this._oldChat
  }

  private _roomInvites: boolean

  public get roomInvites(): boolean {
    return this._roomInvites
  }

  private _cameraFollow: boolean

  public get cameraFollow(): boolean {
    return this._cameraFollow
  }

  private _flags: number

  public get flags(): number {
    return this._flags
  }

  private _chatType: number

  public get chatType(): number {
    return this._chatType
  }

  public flush(): boolean {
    this._volumeSystem = 0
    this._volumeFurni = 0
    this._volumeTrax = 0
    this._oldChat = false
    this._roomInvites = false
    this._cameraFollow = false
    this._flags = 0
    this._chatType = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._volumeSystem = wrapper.readInt()
    this._volumeFurni = wrapper.readInt()
    this._volumeTrax = wrapper.readInt()
    this._oldChat = wrapper.readBoolean()
    this._roomInvites = wrapper.readBoolean()
    this._cameraFollow = wrapper.readBoolean()
    this._flags = wrapper.readInt()
    this._chatType = wrapper.readInt()

    return true
  }
}
