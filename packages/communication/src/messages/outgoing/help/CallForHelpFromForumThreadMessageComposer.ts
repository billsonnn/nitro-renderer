import { IMessageComposer } from '@nitrots/api';

export class CallForHelpFromForumThreadMessageComposer implements IMessageComposer<ConstructorParameters<typeof CallForHelpFromForumThreadMessageComposer>>
{
    private _data: ConstructorParameters<typeof CallForHelpFromForumThreadMessageComposer>;

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: string)
    {
        this._data = [k, _arg_2, _arg_3, _arg_4];
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
