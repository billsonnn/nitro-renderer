import { IRoomObjectController, IRoomObjectUpdateMessage, IVector3D, RoomObjectVariable, Vector3d } from '../../../../api';
import { RoomObjectLogicBase } from '../../../../room';
import { ObjectMoveUpdateMessage } from '../../messages';

export class MovingObjectLogic extends RoomObjectLogicBase
{
    public static DEFAULT_UPDATE_INTERVAL: number = 500;
    private static TEMP_VECTOR: Vector3d = new Vector3d();

    private _liftAmount: number;

    private _location: Vector3d;
    private _locationDelta: Vector3d;
    private _lastUpdateTime: number;
    private _changeTime: number;
    private _updateInterval: number;

    constructor()
    {
        super();

        this._liftAmount = 0;

        this._location = new Vector3d();
        this._locationDelta = new Vector3d();
        this._lastUpdateTime = 0;
        this._changeTime = 0;
        this._updateInterval = MovingObjectLogic.DEFAULT_UPDATE_INTERVAL;
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

            if(difference === (this._updateInterval >> 1)) difference++;

            if(difference > this._updateInterval) difference = this._updateInterval;

            if(this._locationDelta.length > 0)
            {
                vector.assign(this._locationDelta);
                vector.multiply((difference / this._updateInterval));
                vector.add(this._location);
            }
            else
            {
                vector.assign(this._location);
            }

            if(locationOffset) vector.add(locationOffset);

            this.object.setLocation(vector);

            if(difference === this._updateInterval)
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

    public processUpdateMessage(message: IRoomObjectUpdateMessage): void
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

    protected set updateInterval(interval: number)
    {
        if(interval <= 0) interval = 1;

        this._updateInterval = interval;
    }
}
