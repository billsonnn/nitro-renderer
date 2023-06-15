import { IMessageDataWrapper } from '@/api'

export class OutfitData {
  constructor(wrapper: IMessageDataWrapper) {
    this._slotId = wrapper.readInt()
    this._figureString = wrapper.readString()
    this._gender = wrapper.readString()
  }

  private _slotId: number

  public get slotId(): number {
    return this._slotId
  }

  private _figureString: string

  public get figureString(): string {
    return this._figureString
  }

  private _gender: string

  public get gender(): string {
    return this._gender
  }
}
