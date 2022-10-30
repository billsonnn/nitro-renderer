import { IMessageComposer } from '../../../../../../api';

export class FurnitureGroupInfoComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureGroupInfoComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureGroupInfoComposer>;

    constructor(objectId: number, guildId: number)
    {
        this._data = [objectId, guildId];
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
