import { IActionDefinition } from '@/api'
import { ActionType } from '@/nitro'

export class ActionDefinition implements IActionDefinition {
  private _types: Map<number, ActionType>
  private _defaultParameterValue: string
  private _canvasOffsets: Map<string, Map<number, number[]>>

  constructor(data: any) {
    this._id = data.id
    this._state = data.state
    this._precedence = data.precedence
    this._activePartSet = data.activePartSet
    this._assetPartDefinition = data.assetPartDefinition
    this._lay = data.lay
    this._geometryType = data.geometryType
    this._isMain = data.main || false
    this._isDefault = data.isDefault || false
    this._isAnimation = data.animation || false
    this._startFromFrameZero = data.startFromFrameZero || false
    this._prevents = data.prevents || []
    this._preventHeadTurn = data.preventHeadTurn || false
    this._types = new Map()
    this._params = new Map()
    this._defaultParameterValue = ''
    this._canvasOffsets = null

    if (data.params && (data.params.length > 0)) {
      for (const param of data.params) {
        if (!param) continue

        if (param.id === 'default') this._defaultParameterValue = param.value
        else this._params.set(param.id, param.value)
      }
    }

    if (data.types && (data.types.length > 0)) {
      for (const type of data.types) {
        if (!type) continue

        const action = new ActionType(type)

        this._types.set(action.id, action)
      }
    }
  }

  private _id: string

  public get id(): string {
    return this._id
  }

  private _state: string

  public get state(): string {
    return this._state
  }

  private _precedence: number

  public get precedence(): number {
    return this._precedence
  }

  private _activePartSet: string

  public get activePartSet(): string {
    return this._activePartSet
  }

  private _assetPartDefinition: string

  public get assetPartDefinition(): string {
    return this._assetPartDefinition
  }

  private _lay: string

  public get lay(): string {
    return this._lay
  }

  private _geometryType: string

  public get geometryType(): string {
    return this._geometryType
  }

  private _isMain: boolean

  public get isMain(): boolean {
    return this._isMain
  }

  private _isDefault: boolean

  public get isDefault(): boolean {
    return this._isDefault
  }

  private _isAnimation: boolean

  public get isAnimation(): boolean {
    return this._isAnimation
  }

  private _startFromFrameZero: boolean

  public get startFromFrameZero(): boolean {
    return this._startFromFrameZero
  }

  private _prevents: string[]

  public get prevents(): string[] {
    return this._prevents
  }

  private _preventHeadTurn: boolean

  public get preventHeadTurn(): boolean {
    return this._preventHeadTurn
  }

  private _params: Map<string, string>

  public get params(): Map<string, string> {
    return this._params
  }

  public setOffsets(k: string, _arg_2: number, _arg_3: number[]): void {
    if (!this._canvasOffsets) this._canvasOffsets = new Map()

    let existing = this._canvasOffsets.get(k)

    if (!existing) {
      existing = new Map()

      this._canvasOffsets.set(k, existing)
    }

    existing.set(_arg_2, _arg_3)
  }

  public getOffsets(k: string, _arg_2: number): number[] {
    if (!this._canvasOffsets) return null

    const existing = this._canvasOffsets.get(k)

    if (!existing) return null

    return existing.get(_arg_2)
  }

  public getType(id: string): ActionType {
    if (!id) return null

    const existing = this._types.get(parseInt(id))

    if (!existing) return null

    return existing
  }

  public getParameterValue(id: string): string {
    if (!id) return ''

    const existing = this._params.get(id)

    if (!existing) return this._defaultParameterValue

    return existing
  }

  public getPrevents(type: string): string[] {
    return this._prevents.concat(this.getTypePrevents(type))
  }

  public getPreventHeadTurn(k: string): boolean {
    if (!k) return this._preventHeadTurn

    const type = this.getType(k)

    if (!type) return this._preventHeadTurn

    return type.preventHeadTurn
  }

  public isAnimated(k: string): boolean {
    if (!k) return true

    const type = this.getType(k)

    if (!type) return true

    return type.isAnimated
  }

  private getTypePrevents(type: string): string[] {
    if (!type) return []

    const existing = this._types.get(parseInt(type))

    if (!existing) return []

    return existing.prevents
  }
}
