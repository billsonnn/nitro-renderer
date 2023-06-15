import { IRoomObjectSprite } from '@/api'
import { AvatarVisualization, IExpressionAddition } from '@/nitro'

export class ExpressionAddition implements IExpressionAddition {
  constructor(id: number, type: number, visualization: AvatarVisualization) {
    this._id = id
    this._type = type
    this._visualization = visualization
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _type: number

  public get type(): number {
    return this._type
  }

  private _visualization: AvatarVisualization

  public get visualization(): AvatarVisualization {
    return this._visualization
  }

  public dispose(): void {
    this._visualization = null
  }

  public update(sprite: IRoomObjectSprite, scale: number): void {
    return
  }

  public animate(sprite: IRoomObjectSprite): boolean {
    return false
  }
}
