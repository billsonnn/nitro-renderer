import { IAssetData, IRoomGeometry, MouseEventType, RoomObjectVariable } from '@nitrots/api';
import { RoomObjectWidgetRequestEvent, RoomSpriteMouseEvent } from '@nitrots/events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureEditableInternalLinkLogic extends FurnitureLogic
{
    private _showStateOnceRendered: boolean;
    private _updateCount: number;

    constructor()
    {
        super();

        this._showStateOnceRendered = false;
        this._updateCount = 0;
    }

    public getEventTypes(): string[]
    {
        const types = [RoomObjectWidgetRequestEvent.INERNAL_LINK];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(asset.logic)
        {
            if(asset.logic.action)
            {
                if(asset.logic.action.startState === 1) this._showStateOnceRendered = true;
            }
        }
    }

    public update(time: number): void
    {
        super.update(time);

        if(!this._showStateOnceRendered) return;

        this._updateCount++;

        if(this._showStateOnceRendered && (this._updateCount > 20))
        {
            this.setAutomaticStateIndex(1);

            this._showStateOnceRendered = false;
        }
    }

    private setAutomaticStateIndex(state: number): void
    {
        if(!this.object) return;

        if(this.object.model)
        {
            this.object.model.setValue<number>(RoomObjectVariable.FURNITURE_AUTOMATIC_STATE_INDEX, state);
        }
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry) return;

        if(event.type === MouseEventType.DOUBLE_CLICK)
        {
            this.setAutomaticStateIndex(0);
        }

        super.mouseEvent(event, geometry);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.INERNAL_LINK, this.object));
    }
}
