import { IActionDefinition, IActiveActionData } from '@/api'

export class ActiveActionData implements IActiveActionData {
  constructor(action: string, parameter: string = '', startFrame: number = 0) {
    this._actionType = action || ''
    this._actionParameter = parameter || ''
    this._definition = null
    this._startFrame = startFrame || 0
    this._overridingAction = null
  }

  private _actionType: string

  public get actionType(): string {
    return this._actionType
  }

  private _actionParameter: string

  public get actionParameter(): string {
    return this._actionParameter
  }

  public set actionParameter(parameter: string) {
    this._actionParameter = parameter
  }

  private _definition: IActionDefinition

  public get definition(): IActionDefinition {
    return this._definition
  }

  public set definition(definition: IActionDefinition) {
    this._definition = definition
  }

  private _startFrame: number

  public get startFrame(): number {
    return this._startFrame
  }

  private _overridingAction: string

  public get overridingAction(): string {
    return this._overridingAction
  }

  public set overridingAction(action: string) {
    this._overridingAction = action
  }

  public get id(): string {
    if (!this._definition) return ''

    return this._definition.id + '_' + this._actionParameter
  }

  public dispose(): void {
    this._actionType = null
    this._actionParameter = null
    this._definition = null
  }
}
