import { IRoomSession } from '../IRoomSession';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionWordQuizEvent extends RoomSessionEvent
{
    public static RWPUW_NEW_QUESTION: string = 'RWPUW_NEW_QUESTION';
    public static RWPUW_QUESION_FINSIHED: string = 'RWPUW_QUESION_FINSIHED';
    public static RWPUW_QUESTION_ANSWERED: string = 'RWPUW_QUESTION_ANSWERED';

    private _id: number = -1;
    private _pollType: string = null;
    private _pollId: number = -1;
    private _questionId: number = -1;
    private _duration: number = -1;
    private _question: string[] = null;
    private _userId: number = -1;
    private _value: string;
    private _answerCounts: Map<string, number>;

    constructor(k: string, _arg_2: IRoomSession, _arg_3: number = -1)
    {
        super(k, _arg_2);

        this._id = _arg_3;
    }

    public get id(): number
    {
        return this._id;
    }

    public get _Str_5302(): string
    {
        return this._pollType;
    }

    public set _Str_5302(k: string)
    {
        this._pollType = k;
    }

    public get _Str_5213(): number
    {
        return this._pollId;
    }

    public set _Str_5213(k: number)
    {
        this._pollId = k;
    }

    public get _Str_3218(): number
    {
        return this._questionId;
    }

    public set _Str_3218(k: number)
    {
        this._questionId = k;
    }

    public get duration(): number
    {
        return this._duration;
    }

    public set duration(k: number)
    {
        this._duration = k;
    }

    public get question(): string[]
    {
        return this._question;
    }

    public set question(k: string[])
    {
        this._question = k;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public set userId(k: number)
    {
        this._userId = k;
    }

    public get value(): string
    {
        return this._value;
    }

    public set value(k: string)
    {
        this._value = k;
    }

    public get _Str_4036(): Map<string, number>
    {
        return this._answerCounts;
    }

    public set _Str_4036(k: Map<string, number>)
    {
        this._answerCounts = k;
    }
}