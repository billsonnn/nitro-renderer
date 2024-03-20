import { IMessageComposer } from '@nitrots/api';

export class GroupInformationComposer implements IMessageComposer<ConstructorParameters<typeof GroupInformationComposer>>
{
    private _data: ConstructorParameters<typeof GroupInformationComposer>;

    constructor(groupId: number, flag: boolean)
    {
        this._data = [groupId, flag];
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
