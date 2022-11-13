import { IRoomGeometry, MouseEventType } from '../../../../../api';
import { RoomObjectEvent, RoomObjectFurnitureActionEvent, RoomSpriteMouseEvent } from '../../../../../events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureDiceLogic extends FurnitureLogic
{
    private _noTags: boolean;
    private _noTagsLastStateActivate: boolean;

    constructor()
    {
        super();

        this._noTags = false;
        this._noTagsLastStateActivate = false;
    }

    public getEventTypes(): string[]
    {
        const types = [RoomObjectFurnitureActionEvent.DICE_ACTIVATE, RoomObjectFurnitureActionEvent.DICE_OFF];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry || !this.object) return;

        let objectEvent: RoomObjectEvent = null;

        switch(event.type)
        {
            case MouseEventType.DOUBLE_CLICK:
                if(this._noTags)
                {
                    if(((!(this._noTagsLastStateActivate)) || (this.object.getState(0) === 0)) || (this.object.getState(0) === 100))
                    {
                        objectEvent = new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.DICE_ACTIVATE, this.object);

                        this._noTagsLastStateActivate = true;
                    }
                    else
                    {
                        objectEvent = new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.DICE_OFF, this.object);

                        this._noTagsLastStateActivate = false;
                    }
                }
                else
                {
                    if(((event.spriteTag === 'activate') || (this.object.getState(0) === 0)) || (this.object.getState(0) === 100))
                    {
                        objectEvent = new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.DICE_ACTIVATE, this.object);
                    }

                    else if(event.spriteTag === 'deactivate')
                    {
                        objectEvent = new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.DICE_OFF, this.object);
                    }
                }

                if(objectEvent && this.eventDispatcher) this.eventDispatcher.dispatchEvent(objectEvent);

                return;
        }

        super.mouseEvent(event, geometry);
    }
}
