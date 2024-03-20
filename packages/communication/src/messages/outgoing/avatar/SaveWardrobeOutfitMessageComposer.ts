import { IMessageComposer } from '@nitrots/api';

export class SaveWardrobeOutfitMessageComposer implements IMessageComposer<ConstructorParameters<typeof SaveWardrobeOutfitMessageComposer>>
{
    private _data: ConstructorParameters<typeof SaveWardrobeOutfitMessageComposer>;

    constructor(slotId: number, look: string, gender: string)
    {
        this._data = [slotId, look, gender];
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
