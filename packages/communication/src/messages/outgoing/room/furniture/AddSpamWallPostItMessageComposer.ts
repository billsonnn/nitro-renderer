import { IMessageComposer } from '@nitrots/api';

export class AddSpamWallPostItMessageComposer implements IMessageComposer<ConstructorParameters<typeof AddSpamWallPostItMessageComposer>>
{
    private _data: ConstructorParameters<typeof AddSpamWallPostItMessageComposer>;

    constructor(itemId: number, location: string, colorHex: string, message: string)
    {
        this._data = [itemId, location, colorHex, message];
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
