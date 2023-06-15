import { IMessageDataWrapper } from '@/api'
import { INamed } from '@/nitro'

export class CfhSanctionTypeData implements INamed {
  private _probationDays: number

  constructor(wrapper: IMessageDataWrapper) {
    this._name = wrapper.readString()
    this._sanctionLengthInHours = wrapper.readInt()
    this._probationDays = wrapper.readInt()
    this._avatarOnly = wrapper.readBoolean()

    if (wrapper.bytesAvailable) this._tradeLockInfo = wrapper.readString()

    if (wrapper.bytesAvailable) this._machineBanInfo = wrapper.readString()
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _sanctionLengthInHours: number

  public get sanctionLengthInHours(): number {
    return this._sanctionLengthInHours
  }

  private _avatarOnly: boolean

  public get avatarOnly(): boolean {
    return this._avatarOnly
  }

  private _tradeLockInfo: string = ''

  public get tradeLockInfo(): string {
    return this._tradeLockInfo
  }

  private _machineBanInfo: string = ''

  public get machineBanInfo(): string {
    return this._machineBanInfo
  }
}
