import { IRoomGeometry } from '../../../../../api';
import { RoomObjectFurnitureActionEvent } from '../../../../../events';
import { RoomSpriteMouseEvent } from '../../../../../room';
import { MouseEventType } from '../../../../ui';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureMultiStateLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [RoomObjectFurnitureActionEvent.MOUSE_BUTTON, RoomObjectFurnitureActionEvent.MOUSE_ARROW];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if (!event || !geometry || !this.object) return;

        switch (event.type)
        {
            case MouseEventType.ROLL_OVER:
                this.eventDispatcher && this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_BUTTON, this.object));
                break;
            case MouseEventType.ROLL_OUT:
                this.eventDispatcher && this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_ARROW, this.object));
                break;
        }

        super.mouseEvent(event, geometry);
    }
}
