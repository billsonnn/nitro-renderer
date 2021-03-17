import { RoomSpriteMouseEvent } from '../../../../../room/events/RoomSpriteMouseEvent';
import { IRoomGeometry } from '../../../../../room/utils/IRoomGeometry';
import { MouseEventType } from '../../../../ui/MouseEventType';
import { RoomObjectWidgetRequestEvent } from '../../../events/RoomObjectWidgetRequestEvent';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureTrophyLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [ RoomObjectWidgetRequestEvent.TROPHY ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry || !this.object) return;

        switch(event.type)
        {
            case MouseEventType.DOUBLE_CLICK:
                this.useObject();
                return;
        }

        super.mouseEvent(event, geometry);
    }

    public useObject(): void
    {
        if(!this.eventDispatcher || !this.object) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.TROPHY, this.object));
    }
}