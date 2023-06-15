import { IMessageDataWrapper } from '@/api'

export class BreedingPetInfo {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this._webId = wrapper.readInt()
    this._name = wrapper.readString()
    this._level = wrapper.readInt()
    this._figure = wrapper.readString()
    this._owner = wrapper.readString()
  }

  private _webId: number

  public get webId(): number {
    return this._webId
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _level: number

  public get level(): number {
    return this._level
  }

  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _owner: string

  public get owner(): string {
    return this._owner
  }

  public dispose(): void {
    this._webId = 0
    this._name = ''
    this._level = 0
    this._figure = ''
    this._owner = ''
  }
}
