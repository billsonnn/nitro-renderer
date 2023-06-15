import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RentableSpaceStatusMessageParser implements IMessageParser {
  public static readonly SPACE_ALREADY_RENTED = 100
  public static readonly SPACE_EXTEND_NOT_RENTED = 101
  public static readonly SPACE_EXTEND_NOT_RENTED_BY_YOU = 102
  public static readonly CAN_RENT_ONLY_ONE_SPACE = 103
  public static readonly NOT_ENOUGH_CREDITS = 200
  public static readonly NOT_ENOUGH_PIXELS = 201
  public static readonly CANT_RENT_NO_PERMISSION = 202
  public static readonly CANT_RENT_NO_HABBO_CLUB = 203
  public static readonly CANT_RENT = 300
  public static readonly CANT_RENT_GENERIC = 400

  private _rented: boolean

  public get rented(): boolean {
    return this._rented
  }

  private _renterId: number

  public get renterId(): number {
    return this._renterId
  }

  private _renterName: string

  public get renterName(): string {
    return this._renterName
  }

  private _canRent: boolean

  public get canRent(): boolean {
    return this._canRent
  }

  private _canRentErrorCode: number

  public get canRentErrorCode(): number {
    return this._canRentErrorCode
  }

  private _timeRemaining: number

  public get timeRemaining(): number {
    return this._timeRemaining
  }

  private _price: number

  public get price(): number {
    return this._price
  }

  public flush(): boolean {
    this._rented = false
    this._renterId = -1
    this._renterName = null
    this._canRent = false
    this._canRentErrorCode = -1
    this._timeRemaining = -1
    this._price = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._rented = wrapper.readBoolean()
    this._canRentErrorCode = wrapper.readInt()
    this._canRent = (this._canRentErrorCode === 0)
    this._renterId = wrapper.readInt()
    this._renterName = wrapper.readString()
    this._timeRemaining = wrapper.readInt()
    this._price = wrapper.readInt()

    if (!this._rented) {
      this._renterId = -1
      this._renterName = ''
    }

    return true
  }
}
