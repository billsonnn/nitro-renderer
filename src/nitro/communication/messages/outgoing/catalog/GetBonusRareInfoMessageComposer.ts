import { IMessageComposer } from '../../../../../api';

export class GetBonusRareInfoMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetBonusRareInfoMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetBonusRareInfoMessageComposer>;

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
