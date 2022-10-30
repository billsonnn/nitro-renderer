import { IMessageComposer } from '../../../../../api';

export class TogglePetRidingComposer implements IMessageComposer<ConstructorParameters<typeof TogglePetRidingComposer>>
{
    private _data: ConstructorParameters<typeof TogglePetRidingComposer>;

    constructor(petId: number)
    {
        this._data = [petId];
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
