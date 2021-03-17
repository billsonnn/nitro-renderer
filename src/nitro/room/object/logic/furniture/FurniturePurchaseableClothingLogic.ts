import { RoomObjectWidgetRequestEvent } from '../../../events/RoomObjectWidgetRequestEvent';
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
        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG, this.object));
    }
}