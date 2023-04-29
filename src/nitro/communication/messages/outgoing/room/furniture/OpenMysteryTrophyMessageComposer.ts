import { IMessageComposer } from '../../../../../../api';

export class OpenMysteryTrophyMessageComposer implements IMessageComposer<ConstructorParameters<typeof OpenMysteryTrophyMessageComposer>>
{
    private _data: ConstructorParameters<typeof OpenMysteryTrophyMessageComposer>;

    constructor(objectId: number, text: string)
    {
        this._data = [objectId, text];
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
