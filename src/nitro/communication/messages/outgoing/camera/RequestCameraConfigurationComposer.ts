import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class RequestCameraConfigurationComposer implements IMessageComposer<ConstructorParameters<typeof RequestCameraConfigurationComposer>>
{
    private _data: ConstructorParameters<typeof RequestCameraConfigurationComposer>;

    constructor()
    {
        this._data = [];
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
