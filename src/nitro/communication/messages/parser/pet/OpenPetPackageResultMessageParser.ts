import { IMessageDataWrapper, IMessageParser } from '@/api'

export class OpenPetPackageResultMessageParser implements IMessageParser {
  private _objectId: number

  public get objectId(): number {
    return this._objectId
  }

  private _nameValidationStatus: number

  public get nameValidationStatus(): number {
    return this._nameValidationStatus
  }

  private _nameValidationInfo: string

  public get nameValidationInfo(): string {
    return this._nameValidationInfo
  }

  flush(): boolean {
    this._objectId = 0
    this._nameValidationStatus = 0
    this._nameValidationInfo = null

    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._objectId = wrapper.readInt()
    this._nameValidationStatus = wrapper.readInt()
    this._nameValidationInfo = wrapper.readString()

    return true
  }
}
