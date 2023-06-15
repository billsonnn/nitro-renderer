import { IMessageDataWrapper } from '@/api'
import { ForumData } from '@/nitro'

export class ExtendedForumData extends ForumData {
  private _isStaff: boolean

  private _readPermissions: number

  public get readPermissions(): number {
    return this._readPermissions
  }

  private _postMessagePermissions: number

  public get postMessagePermissions(): number {
    return this._postMessagePermissions
  }

  private _postThreadPermissions: number

  public get postThreadPermissions(): number {
    return this._postThreadPermissions
  }

  private _moderatePermissions: number

  public get moderatePermissions(): number {
    return this._moderatePermissions
  }

  private _readPermissionError: string

  public get readPermissionError(): string {
    return this._readPermissionError
  }

  private _postMessagePermissionError: string

  public get postMessagePermissionError(): string {
    return this._postMessagePermissionError
  }

  private _postThreadPermissionError: string

  public get postThreadPermissionError(): string {
    return this._postThreadPermissionError
  }

  private _moderatePermissionError: string

  public get moderatePermissionError(): string {
    return this._moderatePermissionError
  }

  private _reportPermissionError: string

  public get reportPermissionError(): string {
    return this._reportPermissionError
  }

  private _canChangeSettings: boolean

  public get canChangeSettings(): boolean {
    return this._canChangeSettings
  }

  public get hasReadPermissionError(): boolean {
    return (this._readPermissionError.length === 0)
  }

  public get canReport(): boolean {
    return true
  }

  public get hasPostMessagePermissionError(): boolean {
    return (this._postMessagePermissionError.length === 0)
  }

  public get hasPostThreadPermissionError(): boolean {
    return (this._postThreadPermissionError.length === 0)
  }

  public get hasModeratePermissionError(): boolean {
    return (this._moderatePermissionError.length === 0)
  }

  public get isStaf(): boolean {
    return this._isStaff
  }

  public static parse(wrapper: IMessageDataWrapper): ExtendedForumData {
    const extendedForumData: ExtendedForumData = new ExtendedForumData()

    ForumData.fillFromMessage(extendedForumData, wrapper)

    extendedForumData._readPermissions = wrapper.readInt()
    extendedForumData._postMessagePermissions = wrapper.readInt()
    extendedForumData._postThreadPermissions = wrapper.readInt()
    extendedForumData._moderatePermissions = wrapper.readInt()
    extendedForumData._readPermissionError = wrapper.readString()
    extendedForumData._postMessagePermissionError = wrapper.readString()
    extendedForumData._postThreadPermissionError = wrapper.readString()
    extendedForumData._moderatePermissionError = wrapper.readString()
    extendedForumData._reportPermissionError = wrapper.readString()
    extendedForumData._canChangeSettings = wrapper.readBoolean()
    extendedForumData._isStaff = wrapper.readBoolean()

    return extendedForumData
  }
}
