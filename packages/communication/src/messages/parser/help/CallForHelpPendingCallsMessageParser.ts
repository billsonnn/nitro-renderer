import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class CallForHelpPendingCallsMessageParser implements IMessageParser
{
    private _calls: ICall[];

    flush(): boolean
    {
        this._calls = [];
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._calls = [];

        const count = wrapper.readInt();

        for(let i = 0; i < count; i++)
        {
            const callId = wrapper.readString();
            const timestamp = wrapper.readString();
            const message = wrapper.readString();

            this._calls.push({ callId: callId, timeStamp: timestamp, message: message });
        }
        return true;
    }

    public get pendingCalls(): ICall[]
    {
        return this._calls;
    }

    public get count(): number
    {
        return this._calls.length;
    }
}

export interface ICall
{
    callId: string;
    timeStamp: string;
    message: string;
}
