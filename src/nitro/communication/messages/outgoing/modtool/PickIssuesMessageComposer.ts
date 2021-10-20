import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class PickIssuesMessageComposer implements IMessageComposer<any>
{
    private _data: any;

    constructor(k:number[], _arg_2:boolean, _arg_3:number, _arg_4:string)
    {
        this._data = [k.length, ...k, _arg_2, _arg_3, _arg_4];
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
