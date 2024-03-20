import { IMessageComposer } from '@nitrots/api';

export class SubmitRoomToCompetitionMessageComposer implements IMessageComposer<ConstructorParameters<typeof SubmitRoomToCompetitionMessageComposer>>
{
    public static readonly CONFIRM_LEVEL_NOT_ACCEPTED = 0;
    public static readonly CONFIRM_LEVEL_NOT_SUBMITTED = 1;
    public static readonly CONFIRM_LEVEL_NOT_CONFIRMED = 2;
    public static readonly CONFIRM_LEVEL_COMMIT = 3;

    private _data: ConstructorParameters<typeof SubmitRoomToCompetitionMessageComposer>;

    constructor(k: string, _arg_2: number)
    {
        this._data = [k, _arg_2];
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
