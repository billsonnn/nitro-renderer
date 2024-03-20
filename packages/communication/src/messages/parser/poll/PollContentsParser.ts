import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { PollChoice } from './PollChoice';
import { PollQuestion } from './PollQuestion';

export class PollContentsParser implements IMessageParser
{
    private _id = -1;
    private _startMessage = '';
    private _endMessage = '';
    private _numQuestions = 0;
    private _questionArray: PollQuestion[] = [];
    private _npsPoll = false;

    flush(): boolean
    {
        this._id = -1;
        this._startMessage = '';
        this._endMessage = '';
        this._numQuestions = 0;
        this._questionArray = [];
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._id = wrapper.readInt();
        this._startMessage = wrapper.readString();
        this._endMessage = wrapper.readString();
        this._numQuestions = wrapper.readInt();

        for(let i = 0; i < this._numQuestions; i++)
        {
            const question = this.parsePollQuestion(wrapper);
            const childrenCount = wrapper.readInt();

            for(let j = 0; j < childrenCount; j++)
            {
                question.children.push(this.parsePollQuestion(wrapper));
            }

            this._questionArray.push(question);
        }

        this._npsPoll = wrapper.readBoolean();
        return true;
    }

    private parsePollQuestion(k: IMessageDataWrapper): PollQuestion
    {
        const pollQuestion = new PollQuestion();
        pollQuestion.questionId = k.readInt();
        pollQuestion.sortOrder = k.readInt();
        pollQuestion.questionType = k.readInt();
        pollQuestion.questionText = k.readString();
        pollQuestion.questionCategory = k.readInt();
        pollQuestion.questionAnswerType = k.readInt();
        pollQuestion.questionAnswerCount = k.readInt();
        if(((pollQuestion.questionType == 1) || (pollQuestion.questionType == 2)))
        {
            for(let i = 0; i < pollQuestion.questionAnswerCount; i++)
            {
                pollQuestion.questionChoices.push(new PollChoice(k.readString(), k.readString(), k.readInt()));
            }
        }
        return pollQuestion;
    }

    public get id(): number
    {
        return this._id;
    }

    public get startMessage(): string
    {
        return this._startMessage;
    }

    public get endMessage(): string
    {
        return this._endMessage;
    }

    public get numQuestions(): number
    {
        return this._numQuestions;
    }

    public get questionArray(): PollQuestion[]
    {
        return this._questionArray;
    }

    public get npsPoll(): boolean
    {
        return this._npsPoll;
    }

}
