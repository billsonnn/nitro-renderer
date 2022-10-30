import { IMessageComposer } from '../../../../../api';

export class GroupBuyComposer implements IMessageComposer<any[]>
{
    private _data: any[];

    constructor(name: string, description: string, roomId: number, colorA: number, colorB: number, badge: number[])
    {
        this._data = [name, description, roomId, colorA, colorB, badge.length, ...badge];
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
