import { IMessageDataWrapper, IMessageParser } from '@/api'
import { NodeData } from '@/nitro'

export class CatalogIndexMessageParser implements IMessageParser {
  private _root: NodeData

  public get root(): NodeData {
    return this._root
  }

  private _newAdditionsAvailable: boolean

  public get newAdditionsAvailable(): boolean {
    return this._newAdditionsAvailable
  }

  private _catalogType: string

  public get catalogType(): string {
    return this._catalogType
  }

  public flush(): boolean {
    this._root = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._root = new NodeData(wrapper)
    this._newAdditionsAvailable = wrapper.readBoolean()
    this._catalogType = wrapper.readString()

    return true
  }
}
