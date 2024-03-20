import { IMessageDataWrapper } from '@nitrots/api';
import { ILandingPageUserEntry } from './ILandingPageUserEntry';

export class HallOfFameEntryData implements ILandingPageUserEntry
{
    private _userId: number;
    private _userName: string;
    private _figure: string;
    private _rank: number;
    private _currentScore: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._userId = wrapper.readInt();
        this._userName = wrapper.readString();
        this._figure = wrapper.readString();
        this._rank = wrapper.readInt();
        this._currentScore = wrapper.readInt();
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._userName;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get rank(): number
    {
        return this._rank;
    }

    public get currentScore(): number
    {
        return this._currentScore;
    }
}
