import { IMessageComposer } from '@nitrots/api';

export class OpenPetPackageMessageComposer implements IMessageComposer<ConstructorParameters<typeof OpenPetPackageMessageComposer>>
{
    private _data: ConstructorParameters<typeof OpenPetPackageMessageComposer>;

    constructor(objectId: number, petName: string)
    {
        this._data = [objectId, petName];
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
