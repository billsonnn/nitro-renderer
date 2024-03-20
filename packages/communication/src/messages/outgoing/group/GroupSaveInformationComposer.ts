import { IMessageComposer } from '@nitrots/api';

export class GroupSaveInformationComposer implements IMessageComposer<ConstructorParameters<typeof GroupSaveInformationComposer>>
{
    private _data: ConstructorParameters<typeof GroupSaveInformationComposer>;

    constructor(groupId: number, title: string, description: string)
    {
        this._data = [groupId, title, description];
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
