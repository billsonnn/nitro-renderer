import { IMessageComposer } from '@nitrots/api';

export class UserFigureComposer implements IMessageComposer<ConstructorParameters<typeof UserFigureComposer>>
{
    private _data: ConstructorParameters<typeof UserFigureComposer>;

    constructor(gender: string, figure: string)
    {
        this._data = [gender, figure];
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
