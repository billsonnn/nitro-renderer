import { IFurnitureStackingHeightMap, ILegacyWallGeometry, ISelectedRoomObjectData, ITileObjectMap } from '@/api'
import { LegacyWallGeometry, RoomCamera, RoomFurnitureData, TileObjectMap } from '@/nitro'

export class RoomInstanceData {
  private _floorStack: Map<number, RoomFurnitureData>
  private _wallStack: Map<number, RoomFurnitureData>
  private _mouseButtonCursorOwners: string[]

  constructor(roomId: number) {
    this._roomId = roomId

    this._modelName = null
    this._legacyGeometry = new LegacyWallGeometry()
    this._tileObjectMap = null
    this._roomCamera = new RoomCamera()
    this._selectedObject = null
    this._placedObject = null
    this._furnitureStackingHeightMap = null

    this._floorStack = new Map()
    this._wallStack = new Map()
    this._mouseButtonCursorOwners = []
  }

  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _modelName: string

  public get modelName(): string {
    return this._modelName
  }

  private _legacyGeometry: ILegacyWallGeometry

  public get legacyGeometry(): ILegacyWallGeometry {
    return this._legacyGeometry
  }

  private _tileObjectMap: ITileObjectMap

  public get tileObjectMap(): ITileObjectMap {
    return this._tileObjectMap
  }

  private _roomCamera: RoomCamera

  public get roomCamera(): RoomCamera {
    return this._roomCamera
  }

  private _selectedObject: ISelectedRoomObjectData

  public get selectedObject(): ISelectedRoomObjectData {
    return this._selectedObject
  }

  private _placedObject: ISelectedRoomObjectData

  public get placedObject(): ISelectedRoomObjectData {
    return this._placedObject
  }

  private _furnitureStackingHeightMap: IFurnitureStackingHeightMap

  public get furnitureStackingHeightMap(): IFurnitureStackingHeightMap {
    return this._furnitureStackingHeightMap
  }

  public dispose(): void {
    return
  }

  public setModelName(name: string): void {
    this._modelName = name
  }

  public setSelectedObject(data: ISelectedRoomObjectData): void {
    if (this._selectedObject) {
      this._selectedObject.dispose()
    }

    this._selectedObject = data
  }

  public setPlacedObject(data: ISelectedRoomObjectData): void {
    if (this._placedObject) {
      this._placedObject.dispose()
    }

    this._placedObject = data
  }

  public setFurnitureStackingHeightMap(heightMap: IFurnitureStackingHeightMap): void {
    if (this._furnitureStackingHeightMap) this._furnitureStackingHeightMap.dispose()

    this._furnitureStackingHeightMap = heightMap

    if (this._tileObjectMap) this._tileObjectMap.dispose()

    if (this._furnitureStackingHeightMap) {
      this._tileObjectMap = new TileObjectMap(this._furnitureStackingHeightMap.width, this._furnitureStackingHeightMap.height)
    }
  }

  public addPendingFurnitureFloor(data: RoomFurnitureData): void {
    if (!data) return

    this._floorStack.delete(data.id)
    this._floorStack.set(data.id, data)
  }

  public removePendingFunitureFloor(id: number): RoomFurnitureData {
    const existing = this._floorStack.get(id)

    if (!existing) return null

    this._floorStack.delete(id)

    return existing
  }

  public getPendingFurnitureFloor(id: number): RoomFurnitureData {
    const existing = this._floorStack.get(id)

    if (!existing) return null

    this._floorStack.delete(id)

    return existing
  }

  public getNextPendingFurnitureFloor(): RoomFurnitureData {
    if (!this._floorStack.size) return null

    const keys = this._floorStack.keys()

    return this.getPendingFurnitureFloor(keys.next().value as number)
  }

  public addPendingFurnitureWall(data: RoomFurnitureData): void {
    if (!data) return

    this._wallStack.delete(data.id)
    this._wallStack.set(data.id, data)
  }

  public removePendingFurnitureWall(id: number): RoomFurnitureData {
    const existing = this._wallStack.get(id)

    if (!existing) return null

    this._wallStack.delete(id)

    return existing
  }

  public getPendingFurnitureWall(id: number): RoomFurnitureData {
    const existing = this._wallStack.get(id)

    if (!existing) return null

    this._wallStack.delete(id)

    return existing
  }

  public getNextPendingFurnitureWall(): RoomFurnitureData {
    if (!this._wallStack.size) return null

    const keys = this._wallStack.keys()

    return this.getPendingFurnitureWall(keys.next().value as number)
  }

  public addButtonMouseCursorOwner(k: string): boolean {
    const _local_2 = this._mouseButtonCursorOwners.indexOf(k)

    if (_local_2 === -1) {
      this._mouseButtonCursorOwners.push(k)

      return true
    }

    return false
  }

  public removeButtonMouseCursorOwner(k: string): boolean {
    const _local_2 = this._mouseButtonCursorOwners.indexOf(k)

    if (_local_2 > -1) {
      this._mouseButtonCursorOwners.splice(_local_2, 1)

      return true
    }

    return false
  }

  public hasButtonMouseCursorOwners(): boolean {
    return this._mouseButtonCursorOwners.length > 0
  }
}
