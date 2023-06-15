import { IMessageDataWrapper } from '@/api'

export class RarityCategoryData {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this._chance = wrapper.readInt()
    this._breeds = []

    let totalCount = wrapper.readInt()

    while (totalCount > 0) {
      this._breeds.push(wrapper.readInt())

      totalCount--
    }
  }

  private _chance: number

  public get chance(): number {
    return this._chance
  }

  private _breeds: number[]

  public get breeds(): number[] {
    return this._breeds
  }

  public dispose(): void {
    this._chance = -1
    this._breeds = []
  }
}
