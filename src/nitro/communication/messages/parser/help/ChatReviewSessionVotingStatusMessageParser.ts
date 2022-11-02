import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class ChatReviewSessionVotingStatusMessageParser implements IMessageParser
{
    public static readonly AWAITING_VOTE = 0;
    public static readonly VOTED_OK = 1;
    public static readonly VOTED_BAD = 2;
    public static readonly VOTED_VERY_BAD = 3;
    public static readonly NO_VOTE = 4;
    public static readonly FINDING_NEW_VOTER = 5;

    private _status: number[];

    flush(): boolean
    {
        this._status = null;
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._status = [];

        const count = wrapper.readInt();

        for(let i = 0; i < count; i++)
        {
            this._status.push(wrapper.readInt());
        }

        return true;
    }

    public get status(): number[]
    {
        return this._status;
    }
}
