import { IMessageComposer } from '../../../../../../api';

export class SetItemDataMessageComposer implements IMessageComposer<ConstructorParameters<typeof SetItemDataMessageComposer>>
{
    private _data: ConstructorParameters<typeof SetItemDataMessageComposer>;

    constructor(itemId: number, colorHex: string, text: string)
    {
        this._data = [itemId, colorHex, text];
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
