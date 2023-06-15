import { RoomObjectUpdateMessage } from '@/room'

export class ObjectModelDataUpdateMessage extends RoomObjectUpdateMessage {
  constructor(numberKey: string, numberValue: number) {
    super(null, null)

    this._numberKey = numberKey
    this._numberValue = numberValue
  }

  private _numberKey: string

  public get numberKey(): string {
    return this._numberKey
  }

  private _numberValue: number

  public get numberValue(): number {
    return this._numberValue
  }
}
