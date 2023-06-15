import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GuideSessionStartedMessageParser implements IMessageParser {
  private _requesterUserId: number

  public get requesterUserId(): number {
    return this._requesterUserId
  }

  private _requesterName: string

  public get requesterName(): string {
    return this._requesterName
  }

  private _requesterFigure: string

  public get requesterFigure(): string {
    return this._requesterFigure
  }

  private _guideUserId: number

  public get guideUserId(): number {
    return this._guideUserId
  }

  private _guideName: string

  public get guideName(): string {
    return this._guideName
  }

  private _guideFigure: string

  public get guideFigure(): string {
    return this._guideFigure
  }

  public flush(): boolean {
    this._requesterUserId = 0
    this._requesterName = null
    this._requesterFigure = null
    this._guideUserId = 0
    this._guideName = null
    this._guideFigure = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._requesterUserId = wrapper.readInt()
    this._requesterName = wrapper.readString()
    this._requesterFigure = wrapper.readString()
    this._guideUserId = wrapper.readInt()
    this._guideName = wrapper.readString()
    this._guideFigure = wrapper.readString()

    return true
  }
}
