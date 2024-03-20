import { RoomObjectStateChangedEvent } from '@nitrots/events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureRandomStateLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectStateChangedEvent.STATE_RANDOM
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_RANDOM, this.object));
    }
}
