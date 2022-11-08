import { RoomObjectFurnitureActionEvent } from '../../../../../events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureOneWayDoorLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [RoomObjectFurnitureActionEvent.ENTER_ONEWAYDOOR];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.ENTER_ONEWAYDOOR, this.object));
    }
}
