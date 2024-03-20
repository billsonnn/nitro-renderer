import { IMessageComposer } from '@nitrots/api';

export class GetPetCommandsComposer implements IMessageComposer<ConstructorParameters<typeof GetPetCommandsComposer>>
{
    private _data: ConstructorParameters<typeof GetPetCommandsComposer>;

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
