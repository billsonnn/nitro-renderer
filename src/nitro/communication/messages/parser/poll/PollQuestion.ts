import { IPollQuestion } from '@/api'
import { PollChoice } from '@/nitro'

export class PollQuestion implements IPollQuestion {
  constructor() {
    this._children = []
    this._questionChoices = []
  }

  private _questionId: number

  public get questionId(): number {
    return this._questionId
  }

  public set questionId(questionId: number) {
    this._questionId = questionId
  }

  private _questionType: number

  public get questionType(): number {
    return this._questionType
  }

  public set questionType(questionType: number) {
    this._questionType = questionType
  }

  private _sortOrder: number

  public get sortOrder(): number {
    return this._sortOrder
  }

  public set sortOrder(sortOrder: number) {
    this._sortOrder = sortOrder
  }

  private _questionCategory: number

  public get questionCategory(): number {
    return this._questionCategory
  }

  public set questionCategory(questionCategory: number) {
    this._questionCategory = questionCategory
  }

  private _questionText: string

  public get questionText(): string {
    return this._questionText
  }

  public set questionText(questionText: string) {
    this._questionText = questionText
  }

  private _questionAnswerType: number

  public get questionAnswerType(): number {
    return this._questionAnswerType
  }

  public set questionAnswerType(answerType: number) {
    this._questionAnswerType = answerType
  }

  private _questionAnswerCount: number

  public get questionAnswerCount(): number {
    return this._questionAnswerCount
  }

  public set questionAnswerCount(k: number) {
    this._questionAnswerCount = k
  }

  private _children: PollQuestion[]

  public get children(): PollQuestion[] {
    return this._children
  }

  public set children(children: PollQuestion[]) {
    this._children = children
  }

  private _questionChoices: PollChoice[]

  public get questionChoices(): PollChoice[] {
    return this._questionChoices
  }

  public set questionChoices(k: PollChoice[]) {
    this._questionChoices = k
  }
}
