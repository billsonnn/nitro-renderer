import {
  IRoomInstance,
  IRoomInstanceContainer,
  IRoomObject,
  IRoomObjectController,
  IRoomObjectManager,
  IRoomObjectModel,
  IRoomRendererBase
} from '@/api'
import { Disposable } from '@/core'
import { RoomObjectModel } from '@/room'

export class RoomInstance extends Disposable implements IRoomInstance {
  private _updateCategories: number[]

  constructor(id: string, container: IRoomInstanceContainer) {
    super()

    this._id = id
    this._container = container
    this._renderer = null
    this._managers = new Map()
    this._updateCategories = []
    this._model = new RoomObjectModel()
  }

  private _id: string

  public get id(): string {
    return this._id
  }

  private _container: IRoomInstanceContainer

  public get container(): IRoomInstanceContainer {
    return this._container
  }

  private _renderer: IRoomRendererBase

  public get renderer(): IRoomRendererBase {
    return this._renderer
  }

  private _managers: Map<number, IRoomObjectManager>

  public get managers(): Map<number, IRoomObjectManager> {
    return this._managers
  }

  private _model: IRoomObjectModel

  public get model(): IRoomObjectModel {
    return this._model
  }

  public setRenderer(renderer: IRoomRendererBase): void {
    if (renderer === this._renderer) return

    if (this._renderer) this.destroyRenderer()

    this._renderer = renderer

    if (!this._renderer) return

    this._renderer.reset()

    if (this._managers.size) {
      for (const manager of this._managers.values()) {
        if (!manager) continue

        const objects = manager.objects

        if (!objects.length) continue

        for (const object of objects.getValues()) {
          if (!object) continue

          this._renderer.addObject(object)
        }
      }
    }
  }

  public getManager(category: number): IRoomObjectManager {
    const manager = this._managers.get(category)

    if (!manager) return null

    return manager
  }

  public getTotalObjectsForManager(category: number): number {
    const manager = this.getManager(category)

    if (!manager) return 0

    return manager.totalObjects
  }

  public getRoomObject(id: number, category: number): IRoomObject {
    const manager = this.getManager(category)

    if (!manager) return null

    const object = manager.getObject(id)

    if (!object) return null

    return object
  }

  public getRoomObjectsForCategory(category: number): IRoomObject[] {
    const manager = this.getManager(category)

    return (manager ? manager.objects.getValues() : [])
  }

  public getRoomObjectByIndex(index: number, category: number): IRoomObject {
    const manager = this.getManager(category)

    if (!manager) return null

    const object = manager.getObjectByIndex(index)

    if (!object) return null

    return object
  }

  public createRoomObject(id: number, stateCount: number, type: string, category: number): IRoomObjectController {
    const manager = this.getManagerOrCreate(category)

    if (!manager) return null

    const object = manager.createObject(id, stateCount, type)

    if (!object) return null

    if (this._renderer) this._renderer.addObject(object)

    return object
  }

  public createRoomObjectAndInitalize(objectId: number, type: string, category: number): IRoomObject {
    if (!this._container) return null

    return this._container.createRoomObjectAndInitalize(this._id, objectId, type, category)
  }

  public removeRoomObject(id: number, category: number): void {
    const manager = this.getManager(category)

    if (!manager) return

    const object = manager.getObject(id)

    if (!object) return

    object.tearDown()

    if (this._renderer) this._renderer.removeObject(object)

    manager.removeObject(id)
  }

  public removeAllManagers(): void {
    for (const manager of this._managers.values()) {
      if (!manager) continue

      if (this._renderer) {
        const objects = manager.objects

        if (objects.length) {
          for (const object of objects.getValues()) {
            if (!object) continue

            this._renderer.removeObject(object)
          }
        }
      }

      manager.dispose()
    }

    this._managers.clear()
  }

  public addUpdateCategory(category: number): void {
    const index = this._updateCategories.indexOf(category)

    if (index >= 0) return

    this._updateCategories.push(category)
  }

  public removeUpdateCategory(category: number): void {
    const index = this._updateCategories.indexOf(category)

    if (index === -1) return

    this._updateCategories.splice(index, 1)
  }

  public update(time: number, update: boolean = false): void {
    for (const category of this._updateCategories) {
      const manager = this.getManager(category)

      if (!manager) continue

      const objects = manager.objects

      if (!objects.length) continue

      for (const object of objects.getValues()) {
        if (!object) continue

        const logic = object.logic;

        (logic && logic.update(time))
      }
    }

    this._renderer && this._renderer.update(time, update)
  }

  public hasUninitializedObjects(): boolean {
    for (const manager of this._managers.values()) {
      if (!manager) continue

      for (const object of manager.objects.getValues()) {
        if (!object) continue

        if (!object.isReady) return true
      }
    }

    return false
  }

  protected onDispose(): void {
    this.removeAllManagers()

    this.destroyRenderer()

    this._container = null

    this._model.dispose()
  }

  private destroyRenderer(): void {
    if (!this._renderer) return

    this._renderer.dispose()

    this._renderer = null
  }

  private getManagerOrCreate(category: number): IRoomObjectManager {
    let manager = this.getManager(category)

    if (manager) return manager

    manager = this._container.createRoomObjectManager(category)

    if (!manager) return null

    this._managers.set(category, manager)

    return manager
  }
}
