import { IAssetData, IParticleSystem, IRoomGeometry, MapDataType, MouseEventType, RoomObjectVariable } from '@nitrots/api';
import { RoomObjectFurnitureActionEvent, RoomObjectWidgetRequestEvent, RoomSpriteMouseEvent } from '@nitrots/events';
import { ObjectDataUpdateMessage, ObjectModelDataUpdateMessage, RoomObjectUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurniturePresentLogic extends FurnitureLogic
{
    private static MESSAGE: string = 'MESSAGE';
    private static PRODUCT_CODE: string = 'PRODUCT_CODE';
    private static EXTRA_PARAM: string = 'EXTRA_PARAM';
    private static PURCHASER_NAME: string = 'PURCHASER_NAME';
    private static PURCHASER_FIGURE: string = 'PURCHASER_FIGURE';

    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectWidgetRequestEvent.PRESENT
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(asset.logic)
        {
            if(asset.logic.particleSystems && asset.logic.particleSystems.length)
            {
                this.object.model.setValue<IParticleSystem[]>(RoomObjectVariable.FURNITURE_FIREWORKS_DATA, asset.logic.particleSystems);
            }
        }
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(message instanceof ObjectDataUpdateMessage)
        {
            message.data.writeRoomObjectModel(this.object.model);

            this.updateStuffData();
        }

        if(message instanceof ObjectModelDataUpdateMessage)
        {
            if(message.numberKey === RoomObjectVariable.FURNITURE_DISABLE_PICKING_ANIMATION)
            {
                this.object.model.setValue(RoomObjectVariable.FURNITURE_DISABLE_PICKING_ANIMATION, message.numberValue);
            }
        }
    }

    private updateStuffData(): void
    {
        if(!this.object || !this.object.model) return;

        const stuffData = new MapDataType();

        stuffData.initializeFromRoomObjectModel(this.object.model);

        const message = stuffData.getValue(FurniturePresentLogic.MESSAGE);
        const data = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA);

        if(!message && (typeof data === 'string'))
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_DATA, data.substr(1));
        }
        else
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_DATA, stuffData.getValue(FurniturePresentLogic.MESSAGE));
        }

        this.writeToModel(RoomObjectVariable.FURNITURE_TYPE_ID, stuffData.getValue(FurniturePresentLogic.PRODUCT_CODE));
        this.writeToModel(RoomObjectVariable.FURNITURE_PURCHASER_NAME, stuffData.getValue(FurniturePresentLogic.PURCHASER_NAME));
        this.writeToModel(RoomObjectVariable.FURNITURE_PURCHASER_FIGURE, stuffData.getValue(FurniturePresentLogic.PURCHASER_FIGURE));
    }

    private writeToModel(key: string, value: string): void
    {
        if(!value) return;

        this.object.model.setValue(key, value);
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry || !this.object) return;

        switch(event.type)
        {
            case MouseEventType.ROLL_OVER:
                this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_BUTTON, this.object));
                break;
            case MouseEventType.ROLL_OUT:
                this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_ARROW, this.object));
                break;
        }

        super.mouseEvent(event, geometry);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.PRESENT, this.object));
    }
}
