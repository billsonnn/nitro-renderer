import { IMessageDataWrapper, IMessageParser, IQuestion } from '../../../../../api';

export class QuestionParser implements IMessageParser
{
    private _pollType: string = null;
    private _pollId = -1;
    private _questionId = -1;
    private _duration = -1;
    private _question: IQuestion = null;

    flush(): boolean
    {
        this._pollType = null;
        this._pollId = -1;
        this._questionId = -1;
        this._duration = -1;
        this._question = null;
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._pollType = wrapper.readString();
        this._pollId = wrapper.readInt();
        this._questionId = wrapper.readInt();
        this._duration = wrapper.readInt();

        const questionId = wrapper.readInt();
        const questionNumber = wrapper.readInt();
        const questionType = wrapper.readInt();
        const questionContent = wrapper.readString();

        this._question = { id: questionId, number: questionNumber, type: questionType, content: questionContent };

        if(((this._question.type == 1) || (this._question.type == 2)))
        {
            this._question.selection_min = wrapper.readInt();
            const count = wrapper.readInt();
            this._question.selections = [];
            this._question.selection_values = [];
            this._question.selection_count = count;
            this._question.selection_max = count;

            for(let i = 0; i < count; i++)
            {
                this._question.selection_values.push(wrapper.readString());
                this._question.selections.push(wrapper.readString());
            }
        }
        return true;
    }

    public get pollType(): string
    {
        return this._pollType;
    }

    public get pollId(): number
    {
        return this._pollId;
    }

    public get questionId(): number
    {
        return this._questionId;
    }

    public get duration(): number
    {
        return this._duration;
    }

    public get question(): IQuestion
    {
        return this._question;
    }
}
