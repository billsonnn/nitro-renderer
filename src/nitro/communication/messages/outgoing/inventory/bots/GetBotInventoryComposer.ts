import { IMessageComposer } from '../../../../../../api';

export class GetBotInventoryComposer implements IMessageComposer<ConstructorParameters<typeof GetBotInventoryComposer>>
{
    private _data: ConstructorParameters<typeof GetBotInventoryComposer>;

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
