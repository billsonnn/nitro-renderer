import { IMessageComposer } from '../../../../../api';

export class CallForHelpFromForumMessageMessageComposer implements IMessageComposer<ConstructorParameters<typeof CallForHelpFromForumMessageMessageComposer>>
{
    private _data: ConstructorParameters<typeof CallForHelpFromForumMessageMessageComposer>;

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: string)
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
