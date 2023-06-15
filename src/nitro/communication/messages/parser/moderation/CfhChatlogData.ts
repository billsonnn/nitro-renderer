import { IMessageDataWrapper } from '@/api'
import { ChatRecordData } from '@/nitro'

export class CfhChatlogData {
  constructor(k: IMessageDataWrapper) {
    this._issueId = k.readInt()
    this._callerUserId = k.readInt()
    this._reportedUserId = k.readInt()
    this._chatRecordId = k.readInt()
    this._chatRecord = new ChatRecordData(k)
  }

  private _issueId: number

  public get issueId(): number {
    return this._issueId
  }

  private _callerUserId: number

  public get callerUserId(): number {
    return this._callerUserId
  }

  private _reportedUserId: number

  public get reportedUserId(): number {
    return this._reportedUserId
  }

  private _chatRecordId: number

  public get chatRecordId(): number {
    return this._chatRecordId
  }

  private _chatRecord: ChatRecordData

  public get chatRecord(): ChatRecordData {
    return this._chatRecord
  }
}
