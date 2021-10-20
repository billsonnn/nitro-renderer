import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ReleaseIssuesMessageComposer implements IMessageComposer<number[]>
{
    private _data: number[];

    constructor(k: number[])
    {
        this._data = [k.length, ...k];
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
