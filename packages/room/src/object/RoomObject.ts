import { IRoomObjectController, IRoomObjectEventHandler, IRoomObjectModel, IRoomObjectMouseHandler, IRoomObjectUpdateMessage, IRoomObjectVisualization, IVector3D } from '@nitrots/api';
import { Vector3d } from '@nitrots/utils';
import { RoomObjectModel } from './RoomObjectModel';

export class RoomObject implements IRoomObjectController
{
    private static OBJECT_COUNTER: number = 0;

    private _id: number;
    private _instanceId: number;
    private _type: string;
    private _model: IRoomObjectModel = new RoomObjectModel();

    private _location: IVector3D = new Vector3d();
    private _direction: IVector3D = new Vector3d();
    private _states: number[] = [];

    private _visualization: IRoomObjectVisualization = null;
    private _logic: IRoomObjectEventHandler = null;
    private _pendingLogicMessages: IRoomObjectUpdateMessage[] = [];

    private _updateCounter: number = 0;
    private _isReady: boolean = false;

    constructor(id: number, stateCount: number, type: string)
    {
        this._id = id;
        this._instanceId = RoomObject.OBJECT_COUNTER++;
        this._type = type;

        let i = (stateCount - 1);

        while(i >= 0)
        {
            this._states[i] = 0;

            i--;
        }
    }

    public dispose(): void
    {
        this._pendingLogicMessages = [];

        this.setVisualization(null);
        this.setLogic(null);

        if(this._model) this._model.dispose();
    }

    public getLocation(): IVector3D
    {
        return this._location;
    }

    public setLocation(vector: IVector3D): void
    {
        if(!vector) return;

        if((vector.x === this._location.x) && (vector.y === this._location.y) && (vector.z === this._location.z)) return;

        this._location.x = vector.x;
        this._location.y = vector.y;
        this._location.z = vector.z;

        this._updateCounter++;
    }

    public getDirection(): IVector3D
    {
        return this._direction;
    }

    public setDirection(vector: IVector3D): void
    {
        if(!vector) return;

        if((vector.x === this._direction.x) && (vector.y === this._direction.y) && (vector.z === this._direction.z)) return;

        this._direction.x = (((vector.x % 360) + 360) % 360);
        this._direction.y = (((vector.y % 360) + 360) % 360);
        this._direction.z = (((vector.z % 360) + 360) % 360);

        this._updateCounter++;
    }

    public getState(index: number = 0): number
    {
        if((index >= 0) && (index < this._states.length))
        {
            return this._states[index];
        }

        return -1;
    }

    public setState(state: number, index: number = 0): boolean
    {
        if((index >= 0) && (index < this._states.length))
        {
            if(this._states[index] !== state)
            {
                this._states[index] = state;

                this._updateCounter++;
            }

            return true;
        }

        return false;
    }

    public setVisualization(visualization: IRoomObjectVisualization): void
    {
        if(this._visualization === visualization) return;

        if(this._visualization) this._visualization.dispose();

        this._visualization = visualization;

        if(this._visualization) this._visualization.object = this;
    }

    public setLogic(logic: IRoomObjectEventHandler): void
    {
        if(this._logic === logic) return;

        const eventHandler = this._logic;

        if(eventHandler)
        {
            this._logic = null;

            eventHandler.setObject(null);
        }

        this._logic = logic;

        if(this._logic)
        {
            this._logic.setObject(this);

            while(this._pendingLogicMessages.length)
            {
                const message = this._pendingLogicMessages.shift();

                this._logic.processUpdateMessage(message);
            }
        }
    }

    public processUpdateMessage(message: IRoomObjectUpdateMessage): void
    {
        if(this._logic) return this._logic.processUpdateMessage(message);

        this._pendingLogicMessages.push(message);
    }

    public tearDown(): void
    {
        if(this._logic) this._logic.tearDown();
    }

    public get id(): number
    {
        return this._id;
    }

    public get instanceId(): number
    {
        return this._instanceId;
    }

    public get type(): string
    {
        return this._type;
    }

    public get model(): IRoomObjectModel
    {
        return this._model;
    }

    public get visualization(): IRoomObjectVisualization
    {
        return this._visualization;
    }

    public get mouseHandler(): IRoomObjectMouseHandler
    {
        return this._logic as IRoomObjectMouseHandler;
    }

    public get logic(): IRoomObjectEventHandler
    {
        return this._logic;
    }

    public get location(): IVector3D
    {
        return this._location;
    }

    public get direction(): IVector3D
    {
        return this._direction;
    }

    public get updateCounter(): number
    {
        return this._updateCounter;
    }

    public set updateCounter(count: number)
    {
        this._updateCounter = count;
    }

    public get isReady(): boolean
    {
        return this._isReady;
    }

    public set isReady(flag: boolean)
    {
        this._isReady = flag;
    }
}
