import { IMessageComposer } from '@nitrots/api';

export class ClickFurniMessageComposer implements IMessageComposer<ConstructorParameters<typeof ClickFurniMessageComposer>>
{
    private _data: ConstructorParameters<typeof ClickFurniMessageComposer>;

    constructor(id: number, category: number)
    {
        this._data = [id, category];
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
