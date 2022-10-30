import { IMessageComposer } from '../../../../../api';

export class GetIsUserPartOfCompetitionMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetIsUserPartOfCompetitionMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetIsUserPartOfCompetitionMessageComposer>;

    constructor(k: string)
    {
        this._data = [k];
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
