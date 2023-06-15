import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CompetitionEntrySubmitResultMessageParser implements IMessageParser {
  public static SUBMITTED: number = 0
  public static ASK_FOR_SUBMIT: number = 1
  public static ASK_FOR_CONFIRM: number = 2
  public static PREREQUISITES_NOT_MET: number = 3
  public static ROOM_DOOR_NOT_OPEN: number = 4
  public static ROOM_TOO_OLD: number = 5
  public static ASK_FOR_ACCEPT_RULES: number = 6
  private _missingFurnis: { [index: string]: string }

  private _goalId: number

  public get goalId(): number {
    return this._goalId
  }

  private _goalCode: string

  public get goalCode(): string {
    return this._goalCode
  }

  private _result: number

  public get result(): number {
    return this._result
  }

  private _requiredFurnis: string[]

  public get requiredFurnis(): string[] {
    return this._requiredFurnis
  }

  public flush(): boolean {
    this._goalId = 0
    this._goalCode = null
    this._result = 0
    this._requiredFurnis = null
    this._missingFurnis = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    this._goalId = wrapper.readInt()
    this._goalCode = wrapper.readString()
    this._result = wrapper.readInt()
    this._requiredFurnis = []

    let count = wrapper.readInt()

    while (count > 0) {
      this._requiredFurnis.push(wrapper.readString())

      count--
    }


    count = wrapper.readInt()

    while (count > 0) {
      this._missingFurnis[wrapper.readString()] = ''

      count--
    }

    return true
  }

  public isMissing(name: string): boolean {
    return !!this._missingFurnis[name]
  }
}
