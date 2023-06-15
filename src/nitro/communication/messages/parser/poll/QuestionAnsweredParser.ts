import { IMessageDataWrapper, IMessageParser } from '@/api'

export class QuestionAnsweredParser implements IMessageParser {
  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _value: string

  public get value(): string {
    return this._value
  }

  private _answerCounts: Map<string, number>

  public get answerCounts(): Map<string, number> {
    return this._answerCounts
  }

  flush(): boolean {
    this._userId = -1
    this._value = ''
    this._answerCounts = null
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._userId = wrapper.readInt()
    this._value = wrapper.readString()
    this._answerCounts = new Map()

    const count = wrapper.readInt()

    for (let i = 0; i < count; i++) {
      const key = wrapper.readString()
      const value = wrapper.readInt()
      this._answerCounts.set(key, value)
    }
    return true
  }

}
