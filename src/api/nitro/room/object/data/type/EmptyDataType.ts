import {
  IMessageDataWrapper,
  IObjectData,
  IRoomObjectModel,
  ObjectDataBase,
  ObjectDataKey,
  RoomObjectVariable
} from '@/api'

export class EmptyDataType extends ObjectDataBase implements IObjectData {
  public static FORMAT_KEY = ObjectDataKey.EMPTY_KEY

  private _state: string

  public parseWrapper(wrapper: IMessageDataWrapper): void {
    if (!wrapper) return

    this._state = ''

    super.parseWrapper(wrapper)
  }

  public writeRoomObjectModel(model: IRoomObjectModel): void {
    super.writeRoomObjectModel(model)

    model.setValue(RoomObjectVariable.FURNITURE_DATA_FORMAT, EmptyDataType.FORMAT_KEY)
  }

  public getLegacyString(): string {
    return this._state
  }

  public compare(data: IObjectData): boolean {
    return super.compare(data)
  }
}
