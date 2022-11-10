import { IAssetData, IRoomGeometry, MouseEventType, RoomObjectVariable } from '../../../../../api';
import { RoomObjectWidgetRequestEvent, RoomSpriteMouseEvent } from '../../../../../events';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureInternalLinkLogic extends FurnitureLogic
{
    private _showStateOnceRendered: boolean = false;
    private _updateCount: number = 0;

    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectWidgetRequestEvent.INERNAL_LINK
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(asset.logic)
        {
            if(asset.logic.action)
            {
                this.object.model.setValue<string>(RoomObjectVariable.FURNITURE_INTERNAL_LINK, asset.logic.action.link);

                if(asset.logic.action.startState === 1) this._showStateOnceRendered = true;
            }
        }
    }

    public update(time: number): void
    {
        super.update(time);

        if(!this._showStateOnceRendered) return;

        this._updateCount++;

        if(this._showStateOnceRendered && (this._updateCount === 20))
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

        if((event.type === MouseEventType.DOUBLE_CLICK) && this._showStateOnceRendered)
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
