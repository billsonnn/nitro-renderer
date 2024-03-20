import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class ChatReviewSessionStartedMessageParser implements IMessageParser
{
    private _votingTimeout: number;
    private _chatRecord: string;

    flush(): boolean
    {
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._votingTimeout = wrapper.readInt();
        this._chatRecord = wrapper.readString();
        return true;
    }

    public get votingTimeout(): number
    {
        return this._votingTimeout;
    }

    public get chatRecord(): string
    {
        return this._chatRecord;
    }
}
