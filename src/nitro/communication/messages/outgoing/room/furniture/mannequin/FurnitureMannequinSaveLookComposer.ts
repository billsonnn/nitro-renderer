import { IMessageComposer } from '../../../../../../../api';

export class FurnitureMannequinSaveLookComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureMannequinSaveLookComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureMannequinSaveLookComposer>;

    constructor(k: number)
    {
        this._data = [k];
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
