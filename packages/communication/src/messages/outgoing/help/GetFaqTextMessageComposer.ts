import { IMessageComposer } from '@nitrots/api';

export class GetFaqTextMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetFaqTextMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetFaqTextMessageComposer>;

    constructor(questionId: number)
    {
        this._data = [questionId];
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
