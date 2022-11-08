import { RoomObjectWidgetRequestEvent } from '../../../../../events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureTrophyLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [RoomObjectWidgetRequestEvent.TROPHY];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.TROPHY, this.object));
    }
}
