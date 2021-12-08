import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class PollAnswerComposer implements IMessageComposer<any>
{
    private _data: any;

    constructor(pollId:number, questionId:number, answers:string[])
    {
        this._data = [ pollId, questionId, answers.length, ...answers ];
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
