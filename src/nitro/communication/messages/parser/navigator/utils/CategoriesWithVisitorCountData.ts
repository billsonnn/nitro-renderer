import { IMessageDataWrapper } from '@/api'

export class CategoriesWithVisitorCountData {
  constructor(k: IMessageDataWrapper) {
    this._categoryToCurrentUserCountMap = new Map()
    this._categoryToMaxUserCountMap = new Map()

    const count = k.readInt()

    for (let i = 0; i < count; i++) {
      const _local_4 = k.readInt()
      const _local_5 = k.readInt()
      const _local_6 = k.readInt()
      this._categoryToCurrentUserCountMap.set(_local_4, _local_5)
      this._categoryToMaxUserCountMap.set(_local_4, _local_6)
    }
  }

  private _categoryToCurrentUserCountMap: Map<number, number>

  public get categoryToCurrentUserCountMap(): Map<number, number> {
    return this._categoryToCurrentUserCountMap
  }

  private _categoryToMaxUserCountMap: Map<number, number>

  public get categoryToMaxUserCountMap(): Map<number, number> {
    return this._categoryToMaxUserCountMap
  }
}
