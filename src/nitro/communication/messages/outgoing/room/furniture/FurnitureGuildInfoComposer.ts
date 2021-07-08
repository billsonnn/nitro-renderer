import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class FurnitureGuildInfoComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureGuildInfoComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureGuildInfoComposer>;

    constructor(objectId: number, guildId: number)
    {
        this._data = [ objectId, guildId ];
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
