import { ContextMenuEnum } from '@nitrots/api';
import { RoomObjectWidgetRequestEvent } from '@nitrots/events';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurniturePurchaseableClothingLogic extends FurnitureMultiStateLogic
{

    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG,
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG, this.object));
    }

    public get contextMenu(): string
    {
        return ContextMenuEnum.PURCHASABLE_CLOTHING;
    }
}
