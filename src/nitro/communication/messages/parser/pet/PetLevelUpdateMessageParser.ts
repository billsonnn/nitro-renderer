import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PetLevelUpdateMessageParser implements IMessageParser {
  private _roomIndex: number

  public get roomIndex(): number {
    return this._roomIndex
  }

  private _petId: number

  public get petId(): number {
    return this._petId
  }

  private _level: number

  public get level(): number {
    return this._level
  }

  flush(): boolean {
    this._roomIndex = -1
    this._petId = -1
    this._level = -1

    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._roomIndex = wrapper.readInt()
    this._petId = wrapper.readInt()
    this._level = wrapper.readInt()

    return true
  }
}
