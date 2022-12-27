import { IMessageComposer } from '../../../../../../api';

export class OpenWelcomeGiftComposer implements IMessageComposer<ConstructorParameters<typeof OpenWelcomeGiftComposer>>
{
    private _data: ConstructorParameters<typeof OpenWelcomeGiftComposer>;

    constructor(furniId: number)
    {
        this._data = [furniId];
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
