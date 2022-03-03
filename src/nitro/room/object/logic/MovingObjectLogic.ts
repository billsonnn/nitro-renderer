import { RoomObjectUpdateMessage } from '../../../../room/messages/RoomObjectUpdateMessage';
import { IRoomObjectController } from '../../../../room/object/IRoomObjectController';
import { RoomObjectLogicBase } from '../../../../room/object/logic/RoomObjectLogicBase';
import { IVector3D } from '../../../../room/utils/IVector3D';
import { Vector3d } from '../../../../room/utils/Vector3d';
import { ObjectMoveUpdateMessage } from '../../messages/ObjectMoveUpdateMessage';
import { RoomObjectVariable } from '../RoomObjectVariable';

export class MovingObjectLogic extends RoomObjectLogicBase
{
    public static UPDATE_MOVING_INTERVAL: number = 500;
    private static TEMP_VECTOR: Vector3d = new Vector3d();

    private _liftAmount: number;

    private _location: Vector3d;
    private _locationDelta: Vector3d;
    private _lastUpdateTime: number;
    private _changeTime: number;

    constructor()
    {
        super();

        this._liftAmount = 0;

        this._location = new Vector3d();
        this._locationDelta = new Vector3d();
        this._lastUpdateTime = 0;
        this._changeTime = 0;
    }

    protected onDispose(): void
    {
        this._liftAmount = 0;

        super.onDispose();
    }

    public update(time: number): void
    {
        super.update(time);

        const locationOffset = this.getLocationOffset();
        const model = this.object && this.object.model;

        if(model)
        {
            if(locationOffset)
            {
                if(this._liftAmount !== locationOffset.z)
                {
                    this._liftAmount = locationOffset.z;

                    model.setValue(RoomObjectVariable.FURNITURE_LIFT_AMOUNT, this._liftAmount);
                }
            }
            else
            {
                if(this._liftAmount !== 0)
                {
                    this._liftAmount = 0;

                    model.setValue(RoomObjectVariable.FURNITURE_LIFT_AMOUNT, this._liftAmount);
                }
            }
        }

        if((this._locationDelta.length > 0) || locationOffset)
        {
            const vector = MovingObjectLogic.TEMP_VECTOR;

            let difference = (this.time - this._changeTime);

            if(difference === (MovingObjectLogic.UPDATE_MOVING_INTERVAL >> 1)) difference++;

            if(difference > MovingObjectLogic.UPDATE_MOVING_INTERVAL) difference = MovingObjectLogic.UPDATE_MOVING_INTERVAL;

            if(this._locationDelta.length > 0)
            {
                vector.assign(this._locationDelta);
                vector.multiply((difference / MovingObjectLogic.UPDATE_MOVING_INTERVAL));
                vector.add(this._location);
            }
            else
            {
                vector.assign(this._location);
            }

            if(locationOffset) vector.add(locationOffset);

            this.object.setLocation(vector);

            if(difference === MovingObjectLogic.UPDATE_MOVING_INTERVAL)
            {
                this._locationDelta.x = 0;
                this._locationDelta.y = 0;
                this._locationDelta.z = 0;
            }
        }

        this._lastUpdateTime = this.time;
    }

    public setObject(object: IRoomObjectController): void
    {
        super.setObject(object);

        if(object) this._location.assign(object.getLocation());
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        if(!message) return;

        super.processUpdateMessage(message);

        if(message.location) this._location.assign(message.location);

        if(message instanceof ObjectMoveUpdateMessage) return this.processMoveMessage(message);
    }

    private processMoveMessage(message: ObjectMoveUpdateMessage): void
    {
        if(!message || !this.object || !message.location) return;

        this._changeTime = this._lastUpdateTime;

        this._locationDelta.assign(message.targetLocation);
        this._locationDelta.subtract(this._location);
    }

    protected getLocationOffset(): IVector3D
    {
        return null;
    }

    protected get lastUpdateTime(): number
    {
        return this._lastUpdateTime;
    }
}
