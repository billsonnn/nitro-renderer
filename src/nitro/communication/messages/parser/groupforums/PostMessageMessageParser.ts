import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { MessageData } from './MessageData';

export class PostMessageMessageParser implements IMessageParser
{
    private _groupId: number;
    private _threadId: number;
    private _message: MessageData;

    public flush(): boolean
    {
        this._groupId = -1;
        this._threadId = -1;
        this._message = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._groupId = wrapper.readInt();
        this._threadId = wrapper.readInt();
        this._message = MessageData.parse(wrapper);

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

    public get message(): MessageData
    {
        return this._message;
    }
}
