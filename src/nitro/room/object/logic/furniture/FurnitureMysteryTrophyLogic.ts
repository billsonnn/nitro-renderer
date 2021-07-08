import { ContextMenuEnum } from '../../../../ui';
import { RoomObjectWidgetRequestEvent } from '../../../events/RoomObjectWidgetRequestEvent';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureMysteryTrophyLogic extends FurnitureMultiStateLogic
{
    public getEventTypes(): string[]
    {
        const types = [ RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public useObject(): void
    {
        if(!this.eventDispatcher || !this.object) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG, this.object));
    }

    public get contextMenu(): string
    {
        return ContextMenuEnum.MYSTERY_TROPHY;
    }
}
