import { GetTickerTime } from '@/pixi-proxy'
import { PatternMatchData } from '@/nitro'

export class IssueMessageData {
  public static STATE_OPEN: number = 1
  public static STATE_PICKED: number = 2
  public static STATE_CLOSED: number = 3
  private _creationTimeInMilliseconds: number

  constructor(issueId: number, state: number, categoryId: number, reportedCategoryId: number,
              issueAgeinMs: number, priority: number, groupingId: number, reporterUserId: number, reporterUsername: string,
              reportedUserId: number, reportedUsername: string, pickerUserId: number, pickerUsername: string, message: string,
              chatRecordId: number, patterns: PatternMatchData[]) {
    this._issueId = issueId
    this._state = state
    this._categoryId = categoryId
    this._reportedCategoryId = reportedCategoryId
    this._issueAgeInMilliseconds = issueAgeinMs
    this._priority = priority
    this._groupingId = groupingId
    this._reporterUserId = reporterUserId
    this._reporterUserName = reporterUsername
    this._reportedUserId = reportedUserId
    this._reportedUserName = reportedUsername
    this._pickerUserId = pickerUserId
    this._pickerUserName = pickerUsername
    this._message = message
    this._chatRecordId = chatRecordId
    this._patterns = patterns
    this._creationTimeInMilliseconds = GetTickerTime() //getTimer()
  }

  private _issueId: number

  public get issueId(): number {
    return this._issueId
  }

  private _state: number

  public get state(): number {
    return this._state
  }

  private _categoryId: number

  public get categoryId(): number {
    return this._categoryId
  }

  private _reportedCategoryId: number

  public get reportedCategoryId(): number {
    return this._reportedCategoryId
  }

  private _issueAgeInMilliseconds: number

  public get issueAgeInMilliseconds(): number {
    return this._issueAgeInMilliseconds
  }

  private _priority: number

  public get priority(): number {
    return this._priority
  }

  private _groupingId: number

  public get groupingId(): number {
    return this._groupingId
  }

  private _reporterUserId: number

  public get reporterUserId(): number {
    return this._reporterUserId
  }

  private _reporterUserName: string

  public get reporterUserName(): string {
    return this._reporterUserName
  }

  private _reportedUserId: number

  public get reportedUserId(): number {
    return this._reportedUserId
  }

  private _reportedUserName: string

  public get reportedUserName(): string {
    return this._reportedUserName
  }

  private _pickerUserId: number

  public get pickerUserId(): number {
    return this._pickerUserId
  }

  private _pickerUserName: string

  public get pickerUserName(): string {
    return this._pickerUserName
  }

  private _message: string

  public get message(): string {
    return this._message
  }

  private _chatRecordId: number

  public get chatRecordId(): number {
    return this._chatRecordId
  }

  private _patterns: PatternMatchData[]

  public get patterns(): PatternMatchData[] {
    return this._patterns
  }

  private _disposed: boolean = false

  public get disposed(): boolean {
    return this._disposed
  }

  public dispose(): void {

    if (this.disposed) {
      return
    }
    for (const k of this._patterns) {
      k.dispose()
    }
    this._patterns = []
    this._disposed = true
  }

  public getOpenTime(k: number): string {
    const _local_2: number = (((this._issueAgeInMilliseconds + k) - this._creationTimeInMilliseconds) / 1000)
    const _local_3: number = (_local_2 / 60)
    const _local_4: number = (_local_3 % 60)
    const _local_5: number = (_local_3 / 60)
    const _local_6: string = (((_local_4 < 10) ? '0' : '') + _local_4)
    const _local_7: string = (((_local_5 < 10) ? '0' : '') + _local_5)
    return (_local_7 + ':') + _local_6
  }
}
