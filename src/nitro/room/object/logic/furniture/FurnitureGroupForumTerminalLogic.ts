import { RoomObjectVariable } from '@/api'
import { RoomObjectWidgetRequestEvent } from '@/events'
import { FurnitureGuildCustomizedLogic } from '@/nitro'

export class FurnitureGroupForumTerminalLogic extends FurnitureGuildCustomizedLogic {
  public getEventTypes(): string[] {
    const types = [
      RoomObjectWidgetRequestEvent.INERNAL_LINK
    ]

    return this.mergeTypes(super.getEventTypes(), types)
  }

  public useObject(): void {
    if (!this.object || !this.eventDispatcher) return

    this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.INERNAL_LINK, this.object))

    super.useObject()
  }

  protected updateGroupId(id: string): void {
    super.updateGroupId(id)

    this.object.model.setValue(RoomObjectVariable.FURNITURE_INTERNAL_LINK, `groupforum/${ id }`)
  }
}
