import { IPollQuestion } from '@nitrots/api';
import { PollChoice } from './PollChoice';

export class PollQuestion implements IPollQuestion
{
    private _questionId: number;
    private _questionType: number;
    private _sortOrder: number;
    private _questionCategory: number;
    private _questionText: string;
    private _questionAnswerType: number;
    private _questionAnswerCount: number;
    private _children: PollQuestion[];
    private _questionChoices: PollChoice[];

    constructor()
    {
        this._children = [];
        this._questionChoices = [];
    }

    public get questionId(): number
    {
        return this._questionId;
    }

    public set questionId(questionId: number)
    {
        this._questionId = questionId;
    }

    public get questionType(): number
    {
        return this._questionType;
    }

    public set questionType(questionType: number)
    {
        this._questionType = questionType;
    }

    public get sortOrder(): number
    {
        return this._sortOrder;
    }

    public set sortOrder(sortOrder: number)
    {
        this._sortOrder = sortOrder;
    }

    public get questionText(): string
    {
        return this._questionText;
    }

    public set questionText(questionText: string)
    {
        this._questionText = questionText;
    }

    public get questionCategory(): number
    {
        return this._questionCategory;
    }

    public set questionCategory(questionCategory: number)
    {
        this._questionCategory = questionCategory;
    }

    public get questionAnswerType(): number
    {
        return this._questionAnswerType;
    }

    public set questionAnswerType(answerType: number)
    {
        this._questionAnswerType = answerType;
    }

    public get questionAnswerCount(): number
    {
        return this._questionAnswerCount;
    }

    public set questionAnswerCount(k: number)
    {
        this._questionAnswerCount = k;
    }

    public get children(): PollQuestion[]
    {
        return this._children;
    }

    public set children(children: PollQuestion[])
    {
        this._children = children;
    }

    public get questionChoices(): PollChoice[]
    {
        return this._questionChoices;
    }

    public set questionChoices(k: PollChoice[])
    {
        this._questionChoices = k;
    }
}
