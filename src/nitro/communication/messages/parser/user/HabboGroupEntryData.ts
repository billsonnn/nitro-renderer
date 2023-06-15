import { IMessageDataWrapper } from '@/api'

export class HabboGroupEntryData {
  constructor(wrapper: IMessageDataWrapper) {
    this._groupId = wrapper.readInt()
    this._groupName = wrapper.readString()
    this._badgeCode = wrapper.readString()
    this._colorA = wrapper.readString()
    this._colorB = wrapper.readString()
    this._favourite = wrapper.readBoolean()
    this._ownerId = wrapper.readInt()
    this._hasForum = wrapper.readBoolean()
  }

  private _groupId: number

  public get groupId(): number {
    return this._groupId
  }

  private _groupName: string

  public get groupName(): string {
    return this._groupName
  }

  private _badgeCode: string

  public get badgeCode(): string {
    return this._badgeCode
  }

  private _colorA: string

  public get colorA(): string {
    return this._colorA
  }

  private _colorB: string

  public get colorB(): string {
    return this._colorB
  }

  private _favourite: boolean

  public get favourite(): boolean {
    return this._favourite
  }

  private _ownerId: number

  public get ownerId(): number {
    return this._ownerId
  }

  private _hasForum: boolean

  public get hasForum(): boolean {
    return this._hasForum
  }
}
