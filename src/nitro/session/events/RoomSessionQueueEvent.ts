import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionQueueEvent extends RoomSessionEvent
{
    public static RSQE_QUEUE_STATUS: string = 'RSQE_QUEUE_STATUS';
    public static C: string = 'c';
    public static D: string = 'd';
    public static _Str_14665: number = 2;
    public static _Str_14078: number = 1;

    private _name: string;
    private _target: number;
    private _queues: Map<string, number>;
    private _isActive: boolean;
    private _activeQueue: string;

    constructor(k: IRoomSession, _arg_2: string, _arg_3: number, _arg_4: boolean = false)
    {
        super(RoomSessionQueueEvent.RSQE_QUEUE_STATUS, k);

        this._name = _arg_2;
        this._target = _arg_3;
        this._queues = new Map();
        this._isActive = _arg_4;
    }

    public get isActive(): boolean
    {
        return this._isActive;
    }

    public get _Str_26076(): string
    {
        return this._name;
    }

    public get _Str_22709(): number
    {
        return this._target;
    }

    public get _Str_14282(): string[]
    {
        return Array.from(this._queues.keys());
    }

    public _Str_11510(k: string): number
    {
        return this._queues.get(k);
    }

    public _Str_17628(k: string, _arg_2: number): void
    {
        this._queues.set(k, _arg_2);
    }
}