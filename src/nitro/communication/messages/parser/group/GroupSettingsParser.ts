import { IMessageDataWrapper, IMessageParser } from '@/api'
import { GroupDataBadgePart } from './utils'

export class GroupSettingsParser implements IMessageParser {
  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _roomName: string

  public get roomName(): string {
    return this._roomName
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _title: string

  public get title(): string {
    return this._title
  }

  private _description: string

  public get description(): string {
    return this._description
  }

  private _colorA: number

  public get colorA(): number {
    return this._colorA
  }

  private _colorB: number

  public get colorB(): number {
    return this._colorB
  }

  private _state: number

  public get state(): number {
    return this._state
  }

  private _canMembersDecorate: boolean

  public get canMembersDecorate(): boolean {
    return this._canMembersDecorate
  }

  private _badgeParts: Map<number, GroupDataBadgePart>

  public get badgeParts(): Map<number, GroupDataBadgePart> {
    return this._badgeParts
  }

  private _badgeCode: string

  public get badgeCode(): string {
    return this._badgeCode
  }

  private _membersCount: number

  public get membersCount(): number {
    return this._membersCount
  }

  public flush(): boolean {
    this._roomId = 0
    this._roomName = null
    this._id = 0
    this._title = null
    this._description = null
    this._colorA = 0
    this._colorB = 0
    this._state = 0
    this._canMembersDecorate = false
    this._badgeParts = new Map()
    this._badgeCode = null
    this._membersCount = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    const hasRoomData = wrapper.readInt()

    if (hasRoomData === 1) {
      this._roomId = wrapper.readInt()
      this._roomName = wrapper.readString()
      wrapper.readBoolean()
    }

    wrapper.readBoolean()

    this._id = wrapper.readInt()
    this._title = wrapper.readString()
    this._description = wrapper.readString()

    wrapper.readInt()

    this._colorA = wrapper.readInt()
    this._colorB = wrapper.readInt()
    this._state = wrapper.readInt()
    this._canMembersDecorate = wrapper.readInt() === 0

    wrapper.readBoolean()
    wrapper.readString()

    const badgePartsCount = wrapper.readInt()

    for (let i = 0; i < badgePartsCount; i++) {
      const part = new GroupDataBadgePart(i === 0)

      part.key = wrapper.readInt()
      part.color = wrapper.readInt()
      part.position = wrapper.readInt()

      if (part.key === 0) {
        part.position = 4
      }

      this._badgeParts.set(i, part)
    }

    this._badgeCode = wrapper.readString()
    this._membersCount = wrapper.readInt()

    return true
  }
}
