import { RoomSpriteMouseEvent } from '../../../../../room/events/RoomSpriteMouseEvent';
import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { IRoomGeometry } from '../../../../../room/utils/IRoomGeometry';
import { MouseEventType } from '../../../../ui/MouseEventType';
import { RoomObjectWidgetRequestEvent } from '../../../events/RoomObjectWidgetRequestEvent';
import { ObjectDataUpdateMessage } from '../../../messages/ObjectDataUpdateMessage';
import { MapDataType } from '../../data/type/MapDataType';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureMannequinLogic extends FurnitureLogic
{
    private static GENDER: string       = 'GENDER';
    private static FIGURE: string       = 'FIGURE';
    private static OUTFIT_NAME: string  = 'OUTFIT_NAME';

    public getEventTypes(): string[]
    {
        const types = [ RoomObjectWidgetRequestEvent.MANNEQUIN ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(message instanceof ObjectDataUpdateMessage)
        {
            message.data.writeRoomObjectModel(this.object.model);

            this.processObjectData();
        }
    }

    private processObjectData(): void
    {
        if(!this.object || !this.object.model) return;

        const data = new MapDataType();

        data.initializeFromRoomObjectModel(this.object.model);

        this.object.model.setValue(RoomObjectVariable.FURNITURE_MANNEQUIN_GENDER, data.getValue(FurnitureMannequinLogic.GENDER));
        this.object.model.setValue(RoomObjectVariable.FURNITURE_MANNEQUIN_FIGURE, data.getValue(FurnitureMannequinLogic.FIGURE));
        this.object.model.setValue(RoomObjectVariable.FURNITURE_MANNEQUIN_NAME, data.getValue(FurnitureMannequinLogic.OUTFIT_NAME));
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

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.MANNEQUIN, this.object));
    }
}