import { IMessageComposer } from '../../../../../../api';

export class SetClothingChangeDataMessageComposer implements IMessageComposer<ConstructorParameters<typeof SetClothingChangeDataMessageComposer>>
{
    private _data: ConstructorParameters<typeof SetClothingChangeDataMessageComposer>;

    constructor(objectId: number, gender: string, look: string = '')
    {
        this._data = [objectId, gender, look];
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
