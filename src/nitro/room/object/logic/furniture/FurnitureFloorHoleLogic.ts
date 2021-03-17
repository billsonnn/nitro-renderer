import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { Vector3d } from '../../../../../room/utils/Vector3d';
import { RoomObjectFloorHoleEvent } from '../../../events/RoomObjectFloorHoleEvent';
import { ObjectDataUpdateMessage } from '../../../messages/ObjectDataUpdateMessage';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureFloorHoleLogic extends FurnitureMultiStateLogic
{
    private static _Str_9306: number = 0;

    private _currentState: number;
    private _currentLocation: Vector3d;

    constructor()
    {
        super();

        this._currentState      = -1;
        this._currentLocation   = null;
    }

    public getEventTypes(): string[]
    {
        const types = [ RoomObjectFloorHoleEvent.ADD_HOLE, RoomObjectFloorHoleEvent.REMOVE_HOLE ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public dispose(): void
    {
        if(this._currentState === FurnitureFloorHoleLogic._Str_9306)
        {
            this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.REMOVE_HOLE, this.object));
        }

        super.dispose();
    }

    public update(time: number): void
    {
        super.update(time);

        this._Str_25016();
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(!this.object) return;

        if(message instanceof ObjectDataUpdateMessage)
        {
            this._Str_21445(this.object.getState(0));
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
                if(this._currentState === FurnitureFloorHoleLogic._Str_9306)
                {
                    if(this.eventDispatcher) this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.ADD_HOLE, this.object));
                }
            }
        }

        this._currentLocation.assign(location);
    }

    private _Str_21445(state: number): void
    {
        if(state === this._currentState) return;

        if(this.eventDispatcher)
        {
            if(state === FurnitureFloorHoleLogic._Str_9306)
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.ADD_HOLE, this.object));
            }

            else if(this._currentState === FurnitureFloorHoleLogic._Str_9306)
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.REMOVE_HOLE, this.object));
            }
        }

        this._currentState = state;
    }

    private _Str_25016(): void
    {
        if(!this.object) return;

        const model = this.object.model;

        if(!model) return;

        const stateIndex = model.getValue<number>(RoomObjectVariable.FURNITURE_AUTOMATIC_STATE_INDEX);

        if(!isNaN(stateIndex)) this._Str_21445((stateIndex % 2));
    }
}