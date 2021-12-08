import { IMessageDataWrapper } from '../../../../../core';
import { ClubOfferData } from './ClubOfferData';

export class ClubOfferExtendedData extends ClubOfferData
{
    private _Str_16193: number;
    private _Str_22071: number;
    private _Str_21178: number;
    private _Str_21024: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        super(wrapper);

        this._Str_16193 = wrapper.readInt();
        this._Str_22071 = wrapper.readInt();
        this._Str_21178 = wrapper.readInt();
        this._Str_21024 = wrapper.readInt();
    }

    public get _Str_23477(): number
    {
        return this._Str_16193 * this.months;
    }

    public get _Str_21585(): number
    {
        return this._Str_22071 * this.months;
    }

    public get _Str_22469(): number
    {
        return this._Str_21178;
    }

    public get _Str_24050(): number
    {
        return (this._Str_16193 * this.months) - this.priceCredits;
    }

    public get _Str_22280(): number
    {
        return (this._Str_21585 * this.months) - this.priceActivityPoints;
    }

    public get _Str_21229(): number
    {
        return this._Str_21024;
    }
}
