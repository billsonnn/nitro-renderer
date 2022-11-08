import { RoomObjectVariable } from '../../../../../api';
import { RoomObjectDataRequestEvent, RoomObjectWidgetRequestEvent } from '../../../../../events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureYoutubeLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectWidgetRequestEvent.YOUTUBE,
            RoomObjectDataRequestEvent.RODRE_URL_PREFIX
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public update(time: number): void
    {
        super.update(time);

        if(!this.object.model.getValue<string>(RoomObjectVariable.SESSION_URL_PREFIX))
        {
            this.eventDispatcher.dispatchEvent(new RoomObjectDataRequestEvent(RoomObjectDataRequestEvent.RODRE_URL_PREFIX, this.object));
        }
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.YOUTUBE, this.object));
    }
}
