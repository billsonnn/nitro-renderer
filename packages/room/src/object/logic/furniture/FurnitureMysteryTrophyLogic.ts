import { ContextMenuEnum } from '@nitrots/api';
import { RoomObjectWidgetRequestEvent } from '@nitrots/events';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureMysteryTrophyLogic extends FurnitureMultiStateLogic
{
    public getEventTypes(): string[]
    {
        const types = [RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG, this.object));
    }

    public get contextMenu(): string
    {
        return ContextMenuEnum.MYSTERY_TROPHY;
    }
}
