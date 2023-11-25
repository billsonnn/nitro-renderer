import { IMessageDataWrapper } from '../../../../../../api';

export class BadgeAndPointLimit
{
    private _badgeId: string;
    private _limit: number;

    constructor(badgeId: string, limit: IMessageDataWrapper)
    {
        if(!limit) throw new Error('invalid_parser');

        this._badgeId = (('ACH_' + badgeId) + limit.readInt());
        this._limit = limit.readInt();
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
