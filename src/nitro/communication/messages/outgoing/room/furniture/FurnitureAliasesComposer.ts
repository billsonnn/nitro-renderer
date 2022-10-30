import { IMessageComposer } from '../../../../../../api';

export class FurnitureAliasesComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureAliasesComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureAliasesComposer>;

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
