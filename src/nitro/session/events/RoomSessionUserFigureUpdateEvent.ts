import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionUserFigureUpdateEvent extends RoomSessionEvent
{
    public static RSUBE_FIGURE: string = 'RSUBE_FIGURE';

    private _userId: number = 0;
    private _figure: string = '';
    private _gender: string = '';
    private _customInfo: string = '';
    private _achievementScore: number;

    constructor(k: IRoomSession, _arg_2: number, _arg_3: string, _arg_4: string, _arg_5: string, _arg_6: number)
    {
        super(RoomSessionUserFigureUpdateEvent.RSUBE_FIGURE, k);
        this._userId = _arg_2;
        this._figure = _arg_3;
        this._gender = _arg_4;
        this._customInfo = _arg_5;
        this._achievementScore = _arg_6;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public get _Str_9690(): string
    {
        return this._customInfo;
    }

    public get activityPoints(): number
    {
        return this._achievementScore;
    }
}