import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GroupRemoveMemberComposer implements IMessageComposer<ConstructorParameters<typeof GroupRemoveMemberComposer>>
{
    private _data: ConstructorParameters<typeof GroupRemoveMemberComposer>;

    constructor(groupId: number, memberId: number)
    {
        this._data = [ groupId, memberId ];
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