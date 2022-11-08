import { RoomObjectWidgetRequestEvent } from '../../../../../events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureEcotronBoxLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectWidgetRequestEvent.ECOTRONBOX
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.ECOTRONBOX, this.object));
    }
}
