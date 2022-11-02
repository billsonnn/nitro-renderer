import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class QuestionAnsweredParser implements IMessageParser
{
    private _userId: number;
    private _value: string;
    private _answerCounts: Map<string, number>;

    flush(): boolean
    {
        this._userId = -1;
        this._value = '';
        this._answerCounts = null;
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._userId = wrapper.readInt();
        this._value = wrapper.readString();
        this._answerCounts = new Map();

        const count = wrapper.readInt();

        for(let i = 0; i < count; i++)
        {
            const key = wrapper.readString();
            const value = wrapper.readInt();
            this._answerCounts.set(key, value);
        }
        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get value(): string
    {
        return this._value;
    }

    public get answerCounts(): Map<string, number>
    {
        return this._answerCounts;
    }

}
