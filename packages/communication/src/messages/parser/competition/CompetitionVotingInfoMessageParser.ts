import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { CompetitionVotingInfoResult } from './CompetitionVotingInfoResult';

export class CompetitionVotingInfoMessageParser implements IMessageParser
{
    private _goalId: number;
    private _goalCode: string;
    private _resultCode: number;
    private _votesRemaining: number;

    public flush(): boolean
    {
        this._goalId = 0;
        this._goalCode = null;
        this._resultCode = 0;
        this._votesRemaining = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._goalId = wrapper.readInt();
        this._goalCode = wrapper.readString();
        this._resultCode = wrapper.readInt();
        this._votesRemaining = wrapper.readInt();

        return true;
    }

    public get goalId(): number
    {
        return this._goalId;
    }

    public get goalCode(): string
    {
        return this._goalCode;
    }

    public get isVotingAllowedForUser(): boolean
    {
        return (this._resultCode === CompetitionVotingInfoResult.ALLOWED);
    }

    public get votesRemaining(): number
    {
        return this._votesRemaining;
    }

    public get resultCode(): number
    {
        return this._resultCode;
    }
}
