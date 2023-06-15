import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FloorHeightMapMessageParser implements IMessageParser {
  public static TILE_BLOCKED: number = -110

  private _model: string

  public get model(): string {
    return this._model
  }

  private _width: number

  public get width(): number {
    return this._width
  }

  private _height: number

  public get height(): number {
    return this._height
  }

  private _heightMap: number[][]

  public get heightMap(): number[][] {
    return this._heightMap
  }

  private _wallHeight: number

  public get wallHeight(): number {
    return this._wallHeight
  }

  private _scale: number

  public get scale(): number {
    return this._scale
  }

  public flush(): boolean {
    this._model = null
    this._width = 0
    this._height = 0
    this._wallHeight = -1
    this._heightMap = []
    this._scale = 64
    this._model = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    const scale = wrapper.readBoolean()
    const wallHeight = wrapper.readInt()
    const model = wrapper.readString()

    return this.parseExplicitly(model, wallHeight, scale)
  }

  public parseModel(modelString: string, wallHeight: number, scale: boolean = true): boolean {
    return this.parseExplicitly(modelString, wallHeight, scale)
  }

  public getHeight(x: number, y: number): number {
    if ((x < 0) || (x >= this._width) || (y < 0) || (y >= this._height)) return -110

    const row = this._heightMap[y]

    if (row === undefined) return -110

    const height = row[x]

    if (height === undefined) return -110

    return height
  }

  private parseExplicitly(modelString: string, wallHeight: number, scale: boolean = true): boolean {
    this._scale = scale ? 32 : 64
    this._wallHeight = wallHeight
    this._model = modelString

    const model = this._model.split('\r')
    const modelRows = model.length

    let width = 0
    const height = 0

    let iterator = 0

    while (iterator < modelRows) {
      const row = model[iterator]

      if (row.length > width) {
        width = row.length
      }

      iterator++
    }

    this._heightMap = []
    iterator = 0

    while (iterator < modelRows) {
      const heightMap: number[] = []

      let subIterator = 0

      while (subIterator < width) {
        heightMap.push(FloorHeightMapMessageParser.TILE_BLOCKED)

        subIterator++
      }

      this._heightMap.push(heightMap)

      iterator++
    }

    this._width = width
    this._height = modelRows

    iterator = 0

    while (iterator < modelRows) {
      const heightMap = this._heightMap[iterator]
      const text = model[iterator]

      if (text.length > 0) {
        let subIterator = 0

        while (subIterator < text.length) {
          const char = text.charAt(subIterator)
          let height = FloorHeightMapMessageParser.TILE_BLOCKED

          if ((char !== 'x') && (char !== 'X')) height = parseInt(char, 36)

          heightMap[subIterator] = height

          subIterator++
        }
      }

      iterator++
    }

    return true
  }
}
