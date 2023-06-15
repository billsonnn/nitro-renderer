import { IMessageDataWrapper } from '@/api'

export class CompetitionRoomsData {
  constructor(k: IMessageDataWrapper, _arg_2: number = 0, _arg_3: number = 0) {
    this._goalId = _arg_2
    this._pageIndex = _arg_3

    if (k) {
      this._goalId = k.readInt()
      this._pageIndex = k.readInt()
      this._pageCount = k.readInt()
    }
  }

  private _goalId: number

  public get goalId(): number {
    return this._goalId
  }

  private _pageIndex: number

  public get pageIndex(): number {
    return this._pageIndex
  }

  private _pageCount: number

  public get pageCount(): number {
    return this._pageCount
  }
}
