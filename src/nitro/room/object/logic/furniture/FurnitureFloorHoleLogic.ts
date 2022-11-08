import { RoomObjectVariable, Vector3d } from '../../../../../api';
import { RoomObjectFloorHoleEvent } from '../../../../../events';
import { RoomObjectUpdateMessage } from '../../../../../room';
import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureFloorHoleLogic extends FurnitureMultiStateLogic
{
    private static STATE_HOLE: number = 0;

    private _currentState: number;
    private _currentLocation: Vector3d;

    constructor()
    {
        super();

        this._currentState = -1;
        this._currentLocation = null;
    }

    public getEventTypes(): string[]
    {
        const types = [RoomObjectFloorHoleEvent.ADD_HOLE, RoomObjectFloorHoleEvent.REMOVE_HOLE];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    protected onDispose(): void
    {
        if(this._currentState === FurnitureFloorHoleLogic.STATE_HOLE)
        {
            this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.REMOVE_HOLE, this.object));
        }

        super.onDispose();
    }

    public update(time: number): void
    {
        super.update(time);

        this.handleAutomaticStateUpdate();
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(!this.object) return;

        if(message instanceof ObjectDataUpdateMessage)
        {
            this.handleStateUpdate(this.object.getState(0));
        }

        const location = this.object.getLocation();

        if(!this._currentLocation)
        {
            this._currentLocation = new Vector3d();
        }
        else
        {
            if((location.x !== this._currentLocation.x) || (location.y !== this._currentLocation.y))
            {
                if(this._currentState === FurnitureFloorHoleLogic.STATE_HOLE)
                {
                    if(this.eventDispatcher) this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.ADD_HOLE, this.object));
                }
            }
        }

        this._currentLocation.assign(location);
    }

    private handleStateUpdate(state: number): void
    {
        if(state === this._currentState) return;

        if(this.eventDispatcher)
        {
            if(state === FurnitureFloorHoleLogic.STATE_HOLE)
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.ADD_HOLE, this.object));
            }

            else if(this._currentState === FurnitureFloorHoleLogic.STATE_HOLE)
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.REMOVE_HOLE, this.object));
            }
        }

        this._currentState = state;
    }

    private handleAutomaticStateUpdate(): void
    {
        if(!this.object) return;

        const model = this.object.model;

        if(!model) return;

        const stateIndex = model.getValue<number>(RoomObjectVariable.FURNITURE_AUTOMATIC_STATE_INDEX);

        if(!isNaN(stateIndex)) this.handleStateUpdate((stateIndex % 2));
    }
}
