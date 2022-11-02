import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class MOTDNotificationParser implements IMessageParser
{
    private _messages: string[];

    public flush(): boolean
    {
        this._messages = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalMessages = wrapper.readInt();

        while(totalMessages > 0)
        {
            this._messages.push(wrapper.readString());

            totalMessages--;
        }

        return true;
    }

    public get messages(): string[]
    {
        return this._messages;
    }
}
