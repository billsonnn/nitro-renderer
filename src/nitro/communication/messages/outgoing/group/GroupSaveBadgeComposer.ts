import { IMessageComposer } from '../../../../../api';

export class GroupSaveBadgeComposer implements IMessageComposer<any[]>
{
    private _data: any[];

    constructor(groupId: number, badge: number[])
    {
        this._data = [groupId, badge.length, ...badge];
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
