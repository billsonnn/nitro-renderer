import { IMessageComposer } from '@nitrots/api';

export class NewUserExperienceScriptProceedComposer implements IMessageComposer<ConstructorParameters<typeof NewUserExperienceScriptProceedComposer>>
{
    private _data: ConstructorParameters<typeof NewUserExperienceScriptProceedComposer>;

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
