import { IRoomObjectSprite, ISortableSprite } from '@/api'

export class SortableSprite implements ISortableSprite {
  public static Z_INFINITY: number = 100000000

  constructor() {
    this._name = ''
    this._sprite = null

    this._x = 0
    this._y = 0
    this._z = 0
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  public set name(name: string) {
    this._name = name
  }

  private _sprite: IRoomObjectSprite

  public get sprite(): IRoomObjectSprite {
    return this._sprite
  }

  public set sprite(sprite: IRoomObjectSprite) {
    this._sprite = sprite
  }

  private _x: number

  public get x(): number {
    return this._x
  }

  public set x(x: number) {
    this._x = x
  }

  private _y: number

  public get y(): number {
    return this._y
  }

  public set y(y: number) {
    this._y = y
  }

  private _z: number

  public get z(): number {
    return this._z
  }

  public set z(z: number) {
    this._z = z
  }

  public dispose(): void {
    this._z = -(SortableSprite.Z_INFINITY)
    this._sprite = null
  }
}
