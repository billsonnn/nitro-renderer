import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class CallForHelpFromPhotoMessageComposer implements IMessageComposer<ConstructorParameters<typeof CallForHelpFromPhotoMessageComposer>>
{
    private _data: ConstructorParameters<typeof CallForHelpFromPhotoMessageComposer>;

    constructor(k:string, _arg_2:number, _arg_3:number, _arg_4:number, _arg_5:number)
    {
        this._data = [k, _arg_2, _arg_3, _arg_4, _arg_5];
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
