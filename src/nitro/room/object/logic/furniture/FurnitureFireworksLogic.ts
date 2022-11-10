import { IAssetData, IParticleSystem, IRoomGeometry, MouseEventType, RoomObjectVariable } from '../../../../../api';
import { RoomObjectEvent, RoomObjectStateChangedEvent, RoomSpriteMouseEvent } from '../../../../../events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureFireworksLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [RoomObjectStateChangedEvent.STATE_CHANGE];

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

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry || !this.object) return;

        let objectEvent: RoomObjectEvent = null;

        switch(event.type)
        {
            case MouseEventType.DOUBLE_CLICK:
                switch(event.spriteTag)
                {
                    case 'start_stop':
                        objectEvent = new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 1);
                        break;
                    case 'reset':
                        objectEvent = new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 2);
                        break;
                }

                if(this.eventDispatcher && objectEvent)
                {
                    this.eventDispatcher.dispatchEvent(objectEvent);

                    return;
                }
                break;
        }

        super.mouseEvent(event, geometry);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 0));
    }
}
