import { PollChoice } from './PollChoice';

export class PollQuestion
{
    private _questionId:number;
    private _questionType:number;
    private _sortOrder:number;
    private _questionCategory:number;
    private _questionText:string;
    private _questionAnswerType:number;
    private _questionAnswerCount:number;
    private _children:PollQuestion[];
    private _questionChoices:PollChoice[];

    constructor()
    {
        this._children = [];
        this._questionChoices = [];
    }

    public get questionId():number
    {
        return this._questionId;
    }

    public set questionId(k:number)
    {
        this._questionId = k;
    }

    public get questionType():number
    {
        return this._questionType;
    }

    public set questionType(k:number)
    {
        this._questionType = k;
    }

    public get sortOrder():number
    {
        return this._sortOrder;
    }

    public set sortOrder(sortOrder:number)
    {
        this._sortOrder = sortOrder;
    }

    public get questionText():string
    {
        return this._questionText;
    }

    public set questionText(k:string)
    {
        this._questionText = k;
    }

    public get questionCategory():number
    {
        return this._questionCategory;
    }

    public set questionCategory(k:number)
    {
        this._questionCategory = k;
    }

    public get questionAnswerType():number
    {
        return this._questionAnswerType;
    }

    public set questionAnswerType(k:number)
    {
        this._questionAnswerType = k;
    }

    public get questionAnswerCount():number
    {
        return this._questionAnswerCount;
    }

    public set questionAnswerCount(k:number)
    {
        this._questionAnswerCount = k;
    }

    public get children():PollQuestion[]
    {
        return this._children;
    }

    public set children(children:PollQuestion[])
    {
        this._children = children;
    }

    public get questionChoices():PollChoice[]
    {
        return this._questionChoices;
    }

    public set questionChoices(k:PollChoice[])
    {
        this._questionChoices = k;
    }
}
