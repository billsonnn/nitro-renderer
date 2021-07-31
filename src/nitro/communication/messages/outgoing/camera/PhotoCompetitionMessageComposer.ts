import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class PhotoCompetitionMessageComposer implements IMessageComposer<ConstructorParameters<typeof PhotoCompetitionMessageComposer>>
{
    private _data: ConstructorParameters<typeof PhotoCompetitionMessageComposer>;

    constructor()
    {
        this._data = [];
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
