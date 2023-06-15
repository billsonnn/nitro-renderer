import { IObjectData } from '@/api'

export class ObjectData {
  constructor(id: number, state: number, objectData: IObjectData) {
    this._id = id
    this._state = state
    this._data = objectData
  }

  private _id: number = 0

  public get id(): number {
    return this._id
  }

  private _state: number = 0

  public get state(): number {
    return this._state
  }

  private _data: IObjectData

  public get data(): IObjectData {
    return this._data
  }
}
