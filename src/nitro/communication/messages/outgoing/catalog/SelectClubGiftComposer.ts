import { IMessageComposer } from '../../../../../api';

export class SelectClubGiftComposer implements IMessageComposer<ConstructorParameters<typeof SelectClubGiftComposer>>
{
    private _data: ConstructorParameters<typeof SelectClubGiftComposer>;

    constructor(itemName: string)
    {
        this._data = [itemName];
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
