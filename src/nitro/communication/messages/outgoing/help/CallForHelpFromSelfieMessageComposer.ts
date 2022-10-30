import { IMessageComposer } from '../../../../../api';

export class CallForHelpFromSelfieMessageComposer implements IMessageComposer<ConstructorParameters<typeof CallForHelpFromSelfieMessageComposer>>
{
    private _data: ConstructorParameters<typeof CallForHelpFromSelfieMessageComposer>;

    constructor(k: string, _arg_2: number, _arg_3: number, _arg_4: string, _arg_5: number)
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
