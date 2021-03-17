import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class ModifyWallItemDataComposer implements IMessageComposer<ConstructorParameters<typeof ModifyWallItemDataComposer>>
{
    private _data: ConstructorParameters<typeof ModifyWallItemDataComposer>;

    constructor(itemId: number, colorHex: string, text: string)
    {
        this._data = [ itemId, colorHex, text ];
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