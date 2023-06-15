import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GroupFurniContextMenuInfoMessageParser implements IMessageParser {
  private _objectId: number

  public get objectId(): number {
    return this._objectId
  }

  private _guildId: number

  public get guildId(): number {
    return this._guildId
  }

  private _guildName: string

  public get guildName(): string {
    return this._guildName
  }

  private _guildHomeRoomId: number

  public get guildHomeRoomId(): number {
    return this._guildHomeRoomId
  }

  private _userIsMember: boolean

  public get userIsMember(): boolean {
    return this._userIsMember
  }

  private _guildHasReadableForum: boolean

  public get guildHasReadableForum(): boolean {
    return this._guildHasReadableForum
  }

  public flush(): boolean {
    this._objectId = 0
    this._guildId = 0
    this._guildName = null
    this._guildHomeRoomId = 0
    this._userIsMember = false
    this._guildHasReadableForum = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._objectId = wrapper.readInt()
    this._guildId = wrapper.readInt()
    this._guildName = wrapper.readString()
    this._guildHomeRoomId = wrapper.readInt()
    this._userIsMember = wrapper.readBoolean()
    this._guildHasReadableForum = wrapper.readBoolean()

    return true
  }
}
