import { IRoomGeometry, MouseEventType } from '@nitrots/api';
import { RoomObjectEvent, RoomObjectStateChangedEvent, RoomSpriteMouseEvent } from '@nitrots/events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureHockeyScoreLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [RoomObjectStateChangedEvent.STATE_CHANGE];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry || !this.object) return;

        let objectEvent: RoomObjectEvent = null;

        switch(event.type)
        {
            case MouseEventType.DOUBLE_CLICK:
                switch(event.spriteTag)
                {
                    case 'off':
                        objectEvent = new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 3);
                        break;
                }
                break;
            case MouseEventType.MOUSE_CLICK:
                switch(event.spriteTag)
                {
                    case 'inc':
                        objectEvent = new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 2);
                        break;
                    case 'dec':
                        objectEvent = new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 1);
                        break;
                }
                break;
        }

        if(this.eventDispatcher && objectEvent)
        {
            this.eventDispatcher.dispatchEvent(objectEvent);

            return;
        }

        super.mouseEvent(event, geometry);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 3));
    }
}
