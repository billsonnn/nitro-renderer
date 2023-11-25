import { IMessageComposer } from '../../../../../api';

export class GetQuizQuestionsComposer implements IMessageComposer<ConstructorParameters<typeof GetQuizQuestionsComposer>>
{
    private _data: ConstructorParameters<typeof GetQuizQuestionsComposer>;

    constructor(code: string)
    {
        this._data = [code];
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
