import { ContextMenuEnum } from '../../../../../api';
import { RoomObjectWidgetRequestEvent } from '../../../../../events';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureMysteryBoxLogic extends FurnitureMultiStateLogic
{
    public getEventTypes(): string[]
    {
        const types = [RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG, this.object));
    }

    public get contextMenu(): string
    {
        return ContextMenuEnum.MYSTERY_BOX;
    }
}
