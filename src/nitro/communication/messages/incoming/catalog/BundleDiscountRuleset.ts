import { IMessageDataWrapper } from '../../../../../core';

export class BundleDiscountRuleset
{
    private _Str_20535: number;
    private _Str_19937: number;
    private _Str_20951: number;
    private _Str_20460: number;
    private _Str_16144: number[];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._Str_20535 = wrapper.readInt();
        this._Str_19937 = wrapper.readInt();
        this._Str_20951 = wrapper.readInt();
        this._Str_20460 = wrapper.readInt();
        this._Str_16144 = [];

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._Str_16144.push(wrapper.readInt());

            count--;
        }
    }

    public get _Str_22802(): number
    {
        return this._Str_20535;
    }

    public get _Str_9227(): number
    {
        return this._Str_19937;
    }

    public get _Str_23802(): number
    {
        return this._Str_20951;
    }

    public get _Str_21500(): number
    {
        return this._Str_20460;
    }

    public get _Str_25155(): number[]
    {
        return this._Str_16144;
    }
}
