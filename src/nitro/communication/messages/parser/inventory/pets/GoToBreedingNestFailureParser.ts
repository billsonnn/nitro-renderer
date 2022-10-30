import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export class GoToBreedingNestFailureParser implements IMessageParser
{
    public static PET_TOO_TIRED_TO_BREED: number = 6;

    private _reason: number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._reason = wrapper.readInt();

        return true;
    }

    public get reason(): number
    {
        return this._reason;
    }
}
