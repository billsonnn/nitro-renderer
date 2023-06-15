import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FurnitureDataParser } from '@/nitro'
import { ObjectData } from '@/nitro'

export class ObjectsDataUpdateParser implements IMessageParser {
  private _objects: ObjectData[]

  public get objects(): ObjectData[] {
    return this._objects
  }

  public flush(): boolean {
    this._objects = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let totalObjects = wrapper.readInt()

    while (totalObjects > 0) {
      const id = wrapper.readInt()
      const stuffData = FurnitureDataParser.parseObjectData(wrapper)
      const state = parseFloat(stuffData.getLegacyString())

      this._objects.push(new ObjectData(id, state, stuffData))

      totalObjects--
    }

    return true
  }
}
