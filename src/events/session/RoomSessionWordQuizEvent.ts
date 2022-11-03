import { IQuestion, IRoomSession } from '../../api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionWordQuizEvent extends RoomSessionEvent
{
    public static QUESTION: string = 'RWPUW_NEW_QUESTION';
    public static FINISHED: string = 'RWPUW_QUESION_FINSIHED';
    public static ANSWERED: string = 'RWPUW_QUESTION_ANSWERED';

    private _id: number = -1;
    private _pollType: string = null;
    private _pollId: number = -1;
    private _questionId: number = -1;
    private _duration: number = -1;
    private _question: IQuestion = null;
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

    public get pollType(): string
    {
        return this._pollType;
    }

    public set pollType(pollType: string)
    {
        this._pollType = pollType;
    }

    public get pollId(): number
    {
        return this._pollId;
    }

    public set pollId(k: number)
    {
        this._pollId = k;
    }

    public get questionId(): number
    {
        return this._questionId;
    }

    public set questionId(k: number)
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

    public get question(): IQuestion
    {
        return this._question;
    }

    public set question(k: IQuestion)
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

    public set value(value: string)
    {
        this._value = value;
    }

    public get answerCounts(): Map<string, number>
    {
        return this._answerCounts;
    }

    public set answerCounts(k: Map<string, number>)
    {
        this._answerCounts = k;
    }
}
