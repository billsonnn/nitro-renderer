import { IMessageDataWrapper, IMessageParser } from '@/api'
import { PollChoice } from '@/nitro'
import { PollQuestion } from '@/nitro'

export class PollContentsParser implements IMessageParser {
  private _id = -1

  public get id(): number {
    return this._id
  }

  private _startMessage = ''

  public get startMessage(): string {
    return this._startMessage
  }

  private _endMessage = ''

  public get endMessage(): string {
    return this._endMessage
  }

  private _numQuestions = 0

  public get numQuestions(): number {
    return this._numQuestions
  }

  private _questionArray: PollQuestion[] = []

  public get questionArray(): PollQuestion[] {
    return this._questionArray
  }

  private _npsPoll = false

  public get npsPoll(): boolean {
    return this._npsPoll
  }

  flush(): boolean {
    this._id = -1
    this._startMessage = ''
    this._endMessage = ''
    this._numQuestions = 0
    this._questionArray = []
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._id = wrapper.readInt()
    this._startMessage = wrapper.readString()
    this._endMessage = wrapper.readString()
    this._numQuestions = wrapper.readInt()

    for (let i = 0; i < this._numQuestions; i++) {
      const question = this.parsePollQuestion(wrapper)
      const childrenCount = wrapper.readInt()

      for (let j = 0; j < childrenCount; j++) {
        question.children.push(this.parsePollQuestion(wrapper))
      }

      this._questionArray.push(question)
    }

    this._npsPoll = wrapper.readBoolean()
    return true
  }

  private parsePollQuestion(k: IMessageDataWrapper): PollQuestion {
    const pollQuestion = new PollQuestion()
    pollQuestion.questionId = k.readInt()
    pollQuestion.sortOrder = k.readInt()
    pollQuestion.questionType = k.readInt()
    pollQuestion.questionText = k.readString()
    pollQuestion.questionCategory = k.readInt()
    pollQuestion.questionAnswerType = k.readInt()
    pollQuestion.questionAnswerCount = k.readInt()
    if (((pollQuestion.questionType == 1) || (pollQuestion.questionType == 2))) {
      for (let i = 0; i < pollQuestion.questionAnswerCount; i++) {
        pollQuestion.questionChoices.push(new PollChoice(k.readString(), k.readString(), k.readInt()))
      }
    }
    return pollQuestion
  }

}
