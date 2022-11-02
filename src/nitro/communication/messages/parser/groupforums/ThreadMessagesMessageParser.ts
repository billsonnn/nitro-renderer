import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { MessageData } from './MessageData';

export class ThreadMessagesMessageParser implements IMessageParser
{
    private _groupId: number;
    private _threadId: number;
    private _startIndex: number;
    private _amount: number;
    private _messages: MessageData[];

    public flush(): boolean
    {
        this._groupId = -1;
        this._threadId = -1;
        this._startIndex = -1;
        this._amount = 0;
        this._messages = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._groupId = wrapper.readInt();
        this._threadId = wrapper.readInt();
        this._startIndex = wrapper.readInt();
        this._amount = wrapper.readInt();
        this._messages = [];

        let i = 0;

        while(i < this._amount)
        {
            const message = MessageData.parse(wrapper);

            message.groupID = this._groupId;
            message.threadId = this._threadId;

            this._messages.push(message);

            i++;
        }

        return true;
    }

    public get groupId(): number
    {
        return this._groupId;
    }

    public get threadId(): number
    {
        return this._threadId;
    }

    public get startIndex(): number
    {
        return this._startIndex;
    }

    public get amount(): number
    {
        return this._amount;
    }

    public get messages(): MessageData[]
    {
        return this._messages;
    }
}
