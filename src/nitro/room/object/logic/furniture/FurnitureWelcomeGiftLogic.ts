import { IRoomGeometry, MouseEventType } from '../../../../../api';
import { RoomObjectStateChangedEvent, RoomSpriteMouseEvent } from '../../../../../events';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureWelcomeGiftLogic extends FurnitureMultiStateLogic
{
    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry) return;

        if(event.type === MouseEventType.DOUBLE_CLICK)
        {
            if(this.eventDispatcher) this.eventDispatcher.dispatchEvent(new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object));
        }

        super.mouseEvent(event, geometry);
    }
}
