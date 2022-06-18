import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ToggleStaffPickMessageComposer implements IMessageComposer<ConstructorParameters<typeof ToggleStaffPickMessageComposer>>
{
    private _data: ConstructorParameters<typeof ToggleStaffPickMessageComposer>;

    constructor(roomId: number)
    {
        this._data = [ roomId ];
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
