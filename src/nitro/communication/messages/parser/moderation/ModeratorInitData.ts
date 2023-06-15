import { IMessageDataWrapper } from '@/api'
import { IssueInfoMessageParser } from '@/nitro'
import { IssueMessageData } from '@/nitro'

export class ModeratorInitData {
  constructor(wrapper: IMessageDataWrapper) {
    const local2 = new IssueInfoMessageParser()
    this._issues = []
    this._messageTemplates = []
    this._roomMessageTemplates = []

    let local3 = wrapper.readInt()
    let i = 0
    while (i < local3) {
      if (local2.parse(wrapper)) {
        this._issues.push(local2.issueData)
      }
      i++
    }

    local3 = wrapper.readInt()
    i = 0
    while (i < local3) {
      this._messageTemplates.push(wrapper.readString())
      i++
    }

    local3 = wrapper.readInt()
    i = 0
    while (i < local3) {
      wrapper.readString()
      i++
    }

    this._cfhPermission = wrapper.readBoolean()
    this._chatlogsPermission = wrapper.readBoolean()
    this._alertPermission = wrapper.readBoolean()
    this._kickPermission = wrapper.readBoolean()
    this._banPermission = wrapper.readBoolean()
    this._roomAlertPermission = wrapper.readBoolean()
    this._roomKickPermission = wrapper.readBoolean()
    local3 = wrapper.readInt()
    i = 0
    while (i < local3) {
      this._roomMessageTemplates.push(wrapper.readString())
      i++
    }


  }

  private _messageTemplates: string[]

  public get messageTemplates(): string[] {
    return this._messageTemplates
  }

  private _roomMessageTemplates: string[]

  public get roomMessageTemplates(): string[] {
    return this._roomMessageTemplates
  }

  private _issues: IssueMessageData[]

  public get issues(): IssueMessageData[] {
    return this._issues
  }

  private _cfhPermission: boolean

  public get cfhPermission(): boolean {
    return this._cfhPermission
  }

  private _chatlogsPermission: boolean

  public get chatlogsPermission(): boolean {
    return this._chatlogsPermission
  }

  private _alertPermission: boolean

  public get alertPermission(): boolean {
    return this._alertPermission
  }

  private _kickPermission: boolean

  public get kickPermission(): boolean {
    return this._kickPermission
  }

  private _banPermission: boolean

  public get banPermission(): boolean {
    return this._banPermission
  }

  private _roomAlertPermission: boolean

  public get roomAlertPermission(): boolean {
    return this._roomAlertPermission
  }

  private _roomKickPermission: boolean

  public get roomKickPermission(): boolean {
    return this._roomKickPermission
  }

  private _disposed: boolean = false

  public get disposed(): boolean {
    return this._disposed
  }

  public dispose(): void {
    if (this._disposed) {
      return
    }
    this._disposed = true
    this._messageTemplates = null
    this._roomMessageTemplates = null
    this._issues = null
  }

}
