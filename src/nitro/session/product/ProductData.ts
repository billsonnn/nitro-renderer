import { IProductData } from '@/api'

export class ProductData implements IProductData {
  constructor(type: string, name: string, description: string) {
    this._type = type
    this._name = name
    this._description = description
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _description: string

  public get description(): string {
    return this._description
  }
}
