import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CfhSanctionTypeData } from '@/nitro'

export class CfhSanctionMessageParser implements IMessageParser {
  private _issueId: number

  public get issueId(): number {
    return this._issueId
  }

  private _accountId: number

  public get accountId(): number {
    return this._accountId
  }

  private _sanctionType: CfhSanctionTypeData

  public get sanctionType(): CfhSanctionTypeData {
    return this._sanctionType
  }

  public flush(): boolean {
    this._issueId = -1
    this._accountId = 1
    this._sanctionType = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._issueId = wrapper.readInt()
    this._accountId = wrapper.readInt()
    this._sanctionType = new CfhSanctionTypeData(wrapper)

    return true
  }
}
