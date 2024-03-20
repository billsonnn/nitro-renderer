import { IMessageDataWrapper } from '@nitrots/api';

export class BadgeAndPointLimit
{
    private _badgeId: string;
    private _limit: number;

    constructor(k: string, _arg_2: IMessageDataWrapper)
    {
        if(!_arg_2) throw new Error('invalid_parser');

        this._badgeId = (('ACH_' + k) + _arg_2.readInt());
        this._limit = _arg_2.readInt();
    }

    public get badgeId(): string
    {
        return this._badgeId;
    }

    public get limit(): number
    {
        return this._limit;
    }
}
