import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class QuizDataMessageParser implements IMessageParser
{
    private _quizCode: string;
    private _questionIds: number[];

    public flush(): boolean
    {
        this._quizCode = null;
        this._questionIds = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._quizCode = wrapper.readString();

        const size = wrapper.readInt();

        this._questionIds = [];

        for(let i = 0; i < size; i++) this._questionIds.push(wrapper.readInt());

        return true;
    }

    public get quizCode(): string
    {
        return this._quizCode;
    }

    public get questionIds(): number[]
    {
        return this._questionIds;
    }
}
