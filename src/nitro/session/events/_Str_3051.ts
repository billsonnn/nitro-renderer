import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class _Str_3051 extends RoomSessionEvent
{
    public static RSPE_POLL_OFFER: string = 'RSPE_POLL_OFFER';
    public static ERROR: string = 'RSPE_POLL_ERROR';
    public static RSPE_POLL_CONTENT: string = 'RSPE_POLL_CONTENT';

    private _id: number = -1;
    private _headline: string;
    private _summary: string;
    private _Str_5366: number = 0;
    private _Str_5879: string = '';
    private _Str_4781: string = '';
    private _Str_5432: string[] = null;
    private _Str_4353: boolean = false;

    constructor(k: string, _arg_2: IRoomSession, _arg_3: number)
    {
        super(k, _arg_2);

        this._id = _arg_3;
    }

    public get id(): number
    {
        return this._id;
    }

    public get headline(): string
    {
        return this._headline;
    }

    public set headline(k: string)
    {
        this._headline = k;
    }

    public get summary(): string
    {
        return this._summary;
    }

    public set summary(k: string)
    {
        this._summary = k;
    }

    public get _Str_6760(): number
    {
        return this._Str_5366;
    }

    public set _Str_6760(k: number)
    {
        this._Str_5366 = k;
    }

    public get _Str_6013(): string
    {
        return this._Str_5879;
    }

    public set _Str_6013(k: string)
    {
        this._Str_5879 = k;
    }

    public get _Str_5838(): string
    {
        return this._Str_4781;
    }

    public set _Str_5838(k: string)
    {
        this._Str_4781 = k;
    }

    public get _Str_5643(): string[]
    {
        return this._Str_5432;
    }

    public set _Str_5643(k: string[])
    {
        this._Str_5432 = k;
    }

    public get _Str_6196(): boolean
    {
        return this._Str_4353;
    }

    public set _Str_6196(k: boolean)
    {
        this._Str_4353 = k;
    }
}