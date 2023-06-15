import { IMessageDataWrapper, IMessageParser } from '@/api'

export class QuestionFinishedParser implements IMessageParser {
  private _questionId: number

  public get questionId(): number {
    return this._questionId
  }

  private _answerCounts: Map<string, number>

  public get answerCounts(): Map<string, number> {
    return this._answerCounts
  }

  flush(): boolean {
    this._questionId = -1
    this._answerCounts = null
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._questionId = wrapper.readInt()
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
