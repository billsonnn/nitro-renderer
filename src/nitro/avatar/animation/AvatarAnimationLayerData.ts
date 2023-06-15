import { IActionDefinition, IActiveActionData, IAnimationLayerData, IAssetAnimationFramePart } from '@/api'
import { ActiveActionData } from '@/nitro'

export class AvatarAnimationLayerData implements IAnimationLayerData {
  public static BODYPART: string = 'bodypart'
  public static FX: string = 'fx'
  private _directionOffset: number

  constructor(k: IAssetAnimationFramePart, _arg_2: string, _arg_3: IActionDefinition) {
    this._id = k.id
    this._animationFrame = (k.frame || 0)
    this._dx = (k.dx || 0)
    this._dy = (k.dy || 0)
    this._dz = (k.dz || 0)
    this._directionOffset = (k.dd || 0)
    this._type = _arg_2
    this._base = (k.base || '')
    this._items = new Map()

    if (k.items) for (const _local_4 of k.items) this._items.set(_local_4.id, _local_4.base)

    let _local_5 = ''

    if (this._base !== '') _local_5 = this.baseAsInt().toString()

    if (_arg_3) {
      this._action = new ActiveActionData(_arg_3.state, this.base)
      this._action.definition = _arg_3
    }
  }

  private _id: string

  public get id(): string {
    return this._id
  }

  private _action: IActiveActionData

  public get action(): IActiveActionData {
    return this._action
  }

  private _animationFrame: number

  public get animationFrame(): number {
    return this._animationFrame
  }

  private _dx: number

  public get dx(): number {
    return this._dx
  }

  private _dy: number

  public get dy(): number {
    return this._dy
  }

  private _dz: number

  public get dz(): number {
    return this._dz
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _base: string

  public get base(): string {
    return this._base
  }

  private _items: Map<string, string>

  public get items(): Map<string, string> {
    return this._items
  }

  public get dd(): number {
    return this._directionOffset
  }

  private baseAsInt(): number {
    let k = 0
    let index = 0

    while (index < this._base.length) {
      k = (k + this._base.charCodeAt(index))

      index++
    }

    return k
  }
}
