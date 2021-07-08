import { IRoomGeometry, RoomObjectUpdateMessage, RoomSpriteMouseEvent } from '../../../../../room';
import { MouseEventType, RoomWidgetEnumItemExtradataParameter } from '../../../../ui';
import { RoomObjectWidgetRequestEvent } from '../../../events';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureLogic } from './FurnitureLogic';

export class FurniturePetCustomizationLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [ RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(!this.object) return;

        if(this.object.model.getValue(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) === 1)
        {
            this.object.model.setValue(RoomWidgetEnumItemExtradataParameter.INFOSTAND_EXTRA_PARAM, RoomWidgetEnumItemExtradataParameter.USABLE_PRODUCT);
        }
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

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU, this.object));
    }
}
