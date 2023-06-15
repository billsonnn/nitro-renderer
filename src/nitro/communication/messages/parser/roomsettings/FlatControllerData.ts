import { IMessageDataWrapper } from '@/api'
import { IFlatUser } from '@/nitro'

export class FlatControllerData implements IFlatUser {
  constructor(wrapper: IMessageDataWrapper) {
    this._userId = wrapper.readInt()
    this._userName = wrapper.readString()
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _userName: string

  public get userName(): string {
    return this._userName
  }

  private _selected: boolean

  public get selected(): boolean {
    return this._selected
  }

  public set selected(selected: boolean) {
    this._selected = selected
  }
}
