import { PatternMatchData } from './PatternMatchData';

export class IssueMessageData
{
    public static STATE_OPEN: number = 1;
    public static STATE_PICKED: number = 2;
    public static STATE_CLOSED: number = 3;

    private _issueId: number;
    private _state: number;
    private _categoryId: number;
    private _reportedCategoryId: number;
    private _issueAgeInMilliseconds: number;
    private _priority: number;
    private _groupingId: number;
    private _reporterUserId: number;
    private _reporterUserName: string;
    private _reportedUserId: number;
    private _reportedUserName: string;
    private _pickerUserId: number;
    private _pickerUserName: string;
    private _message: string;
    private _chatRecordId: number;
    private _patterns: PatternMatchData[];
    private _disposed: boolean = false;
    private _creationTimeInMilliseconds: number;

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: number, _arg_6: number, _arg_7: number, _arg_8: number, _arg_9: string, _arg_10: number, _arg_11: string, _arg_12: number, _arg_13: string, _arg_14: string, _arg_15: number, _arg_16:PatternMatchData[])
    {
        this._issueId = k;
        this._state = _arg_2;
        this._categoryId = _arg_3;
        this._reportedCategoryId = _arg_4;
        this._issueAgeInMilliseconds = _arg_5;
        this._priority = _arg_6;
        this._groupingId = _arg_7;
        this._reporterUserId = _arg_8;
        this._reporterUserName = _arg_9;
        this._reportedUserId = _arg_10;
        this._reportedUserName = _arg_11;
        this._pickerUserId = _arg_12;
        this._pickerUserName = _arg_13;
        this._message = _arg_14;
        this._chatRecordId = _arg_15;
        this._patterns = _arg_16;
        this._creationTimeInMilliseconds = 0; //getTimer();
    }

    public get issueId(): number
    {
        return this._issueId;
    }

    public get state(): number
    {
        return this._state;
    }

    public get categoryId(): number
    {
        return this._categoryId;
    }

    public get reportedCategoryId(): number
    {
        return this._reportedCategoryId;
    }

    public get issueAgeInMilliseconds(): number
    {
        return this._issueAgeInMilliseconds;
    }

    public get priority(): number
    {
        return this._priority;
    }

    public get groupingId(): number
    {
        return this._groupingId;
    }

    public get reporterUserId(): number
    {
        return this._reporterUserId;
    }

    public get reporterUserName(): string
    {
        return this._reporterUserName;
    }

    public get reportedUserId(): number
    {
        return this._reportedUserId;
    }

    public get reportedUserName(): string
    {
        return this._reportedUserName;
    }

    public get pickerUserId(): number
    {
        return this._pickerUserId;
    }

    public get pickerUserName(): string
    {
        return this._pickerUserName;
    }

    public get message(): string
    {
        return this._message;
    }

    public get chatRecordId(): number
    {
        return this._chatRecordId;
    }

    public get patterns(): PatternMatchData[]
    {
        return this._patterns;
    }

    public dispose(): void
    {

        if(this.disposed)
        {
            return;
        }
        for(const k of this._patterns)
        {
            k.dispose();
        }
        this._patterns = [];
        this._disposed = true;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public getOpenTime(k: number): string
    {
        const _local_2: number = (((this._issueAgeInMilliseconds + k) - this._creationTimeInMilliseconds) / 1000);
        const _local_3: number = (_local_2 / 60);
        const _local_4: number = (_local_3 % 60);
        const _local_5: number = (_local_3 / 60);
        const _local_6: string = (((_local_4 < 10) ? '0' : '') + _local_4);
        const _local_7: string = (((_local_5 < 10) ? '0' : '') + _local_5);
        return (_local_7 + ':') + _local_6;
    }
}
