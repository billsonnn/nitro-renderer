import { IMessageComposer } from '@nitrots/api';

export class PostQuizAnswersComposer implements IMessageComposer<any>
{
    private _data: any;

    constructor(quizCode: string, answerIds: number[])
    {
        this._data = [quizCode, answerIds.length, ...answerIds];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
