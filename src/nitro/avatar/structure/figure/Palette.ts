import { AdvancedMap, IAdvancedMap, IFigureDataPalette, IPalette, IPartColor } from '@/api'
import { PartColor } from '@/nitro'

export class Palette implements IPalette {
  constructor(data: IFigureDataPalette) {
    if (!data) throw new Error('invalid_data')

    this._id = data.id
    this._colors = new AdvancedMap()

    this.append(data)
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _colors: IAdvancedMap<string, IPartColor>

  public get colors(): IAdvancedMap<string, IPartColor> {
    return this._colors
  }

  public append(data: IFigureDataPalette): void {
    for (const color of data.colors) {
      const newColor = new PartColor(color)

      this._colors.add(color.id.toString(), newColor)
    }
  }

  public getColor(id: number): IPartColor {
    if ((id === undefined) || id < 0) return null

    return (this._colors.getValue(id.toString()) || null)
  }
}
