import { IVector3D } from '@/api'
import { ObjectMoveUpdateMessage } from '@/nitro'

export class ObjectAvatarUpdateMessage extends ObjectMoveUpdateMessage {
  constructor(location: IVector3D, targetLocation: IVector3D, direction: IVector3D, headDirection: number, canStandUp: boolean, baseY: number) {
    super(location, targetLocation, direction)

    this._headDirection = headDirection
    this._canStandUp = canStandUp
    this._baseY = baseY
  }

  private _headDirection: number

  public get headDirection(): number {
    return this._headDirection
  }

  private _canStandUp: boolean

  public get canStandUp(): boolean {
    return this._canStandUp
  }

  private _baseY: number

  public get baseY(): number {
    return this._baseY
  }
}
