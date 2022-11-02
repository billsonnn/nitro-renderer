import { IMessageComposer } from '../../../../../api';

export class VersionCheckMessageComposer implements IMessageComposer<ConstructorParameters<typeof VersionCheckMessageComposer>>
{
    private _data: ConstructorParameters<typeof VersionCheckMessageComposer>;

    constructor(clientID: number, clientURL: string, externalVariablesURL: string)
    {
        this._data = [clientID, clientURL, externalVariablesURL];
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
