import { IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionQueueEvent extends RoomSessionEvent
{
    public static QUEUE_STATUS: string = 'RSQE_QUEUE_STATUS';
    public static QUEUE_TYPE_CLUB: string = 'c';
    public static QUEUE_TYPE_NORMAL: string = 'd';
    public static QUEUE_TARGET_VISITOR: number = 2;
    public static QUEUE_TARGET_SPECTATOR: number = 1;

    private _name: string;
    private _target: number;
    private _queues: Map<string, number>;
    private _isActive: boolean;
    private _activeQueue: string;

    constructor(k: IRoomSession, _arg_2: string, _arg_3: number, _arg_4: boolean = false)
    {
        super(RoomSessionQueueEvent.QUEUE_STATUS, k);

        this._name = _arg_2;
        this._target = _arg_3;
        this._queues = new Map();
        this._isActive = _arg_4;
    }

    public get isActive(): boolean
    {
        return this._isActive;
    }

    public get queueSetName(): string
    {
        return this._name;
    }

    public get queueSetTarget(): number
    {
        return this._target;
    }

    public get queueTypes(): string[]
    {
        return Array.from(this._queues.keys());
    }

    public getQueueSize(k: string): number
    {
        return this._queues.get(k);
    }

    public addQueue(k: string, _arg_2: number): void
    {
        this._queues.set(k, _arg_2);
    }
}
