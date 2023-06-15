import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomVisualizationSettingsParser implements IMessageParser {
  private _hideWalls: boolean

  public get hideWalls(): boolean {
    return this._hideWalls
  }

  private _thicknessWall: number

  public get thicknessWall(): number {
    return this._thicknessWall
  }

  private _thicknessFloor: number

  public get thicknessFloor(): number {
    return this._thicknessFloor
  }

  public flush(): boolean {
    this._hideWalls = false
    this._thicknessWall = 0
    this._thicknessFloor = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._hideWalls = wrapper.readBoolean()

    let thicknessWall = wrapper.readInt()
    let thicknessFloor = wrapper.readInt()

    thicknessWall = (thicknessWall < -2) ? -2 : (thicknessWall > 1) ? 1 : thicknessWall
    thicknessFloor = (thicknessFloor < -2) ? -2 : (thicknessFloor > 1) ? 1 : thicknessFloor

    this._thicknessWall = Math.pow(2, thicknessWall)
    this._thicknessFloor = Math.pow(2, thicknessFloor)

    return true
  }
}
