import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CatalogPublishedMessageParser implements IMessageParser {
  private _instantlyRefreshCatalogue: boolean

  public get instantlyRefreshCatalogue(): boolean {
    return this._instantlyRefreshCatalogue
  }

  private _newFurniDataHash: string

  public get newFurniDataHash(): string {
    return this._newFurniDataHash
  }

  public flush(): boolean {
    this._instantlyRefreshCatalogue = false
    this._newFurniDataHash = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._instantlyRefreshCatalogue = wrapper.readBoolean()

    if (wrapper.bytesAvailable) this._newFurniDataHash = wrapper.readString()

    return true
  }
}
