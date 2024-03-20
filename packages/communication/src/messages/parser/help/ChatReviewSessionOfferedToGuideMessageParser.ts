import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class ChatReviewSessionOfferedToGuideMessageParser implements IMessageParser
{
    private _acceptanceTimeout: number;

    flush(): boolean
    {
        this._acceptanceTimeout = -1;
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._acceptanceTimeout = wrapper.readInt();
        return true;
    }

    public get acceptanceTimeout(): number
    {
        return this._acceptanceTimeout;
    }
}
