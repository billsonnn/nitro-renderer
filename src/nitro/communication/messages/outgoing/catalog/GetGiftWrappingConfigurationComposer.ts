import { IMessageComposer } from '../../../../../api';

export class GetGiftWrappingConfigurationComposer implements IMessageComposer<ConstructorParameters<typeof GetGiftWrappingConfigurationComposer>>
{
    private _data: ConstructorParameters<typeof GetGiftWrappingConfigurationComposer>;

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
