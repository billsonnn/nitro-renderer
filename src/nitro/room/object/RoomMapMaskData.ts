import { IVector3D } from '@/api'

export class RoomMapMaskData {
  constructor() {
    this._masks = []
  }

  private _masks: { id: string, type: string, category: string, locations: IVector3D[] }[]

  public get masks(): { id: string, type: string, category: string, locations: IVector3D[] }[] {
    return this._masks
  }
}
