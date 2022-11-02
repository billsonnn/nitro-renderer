import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class QuizResultsMessageParser implements IMessageParser
{
    private _quizCode: string;
    private _questionIdsForWrongAnswers: number[];

    public flush(): boolean
    {
        this._quizCode = null;
        this._questionIdsForWrongAnswers = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._quizCode = wrapper.readString();

        const size = wrapper.readInt();

        this._questionIdsForWrongAnswers = [];

        for(let i = 0; i < size; i++) this._questionIdsForWrongAnswers.push(wrapper.readInt());

        return true;
    }

    public get quizCode(): string
    {
        return this._quizCode;
    }

    public get questionIdsForWrongAnswers(): number[]
    {
        return this._questionIdsForWrongAnswers;
    }
}
