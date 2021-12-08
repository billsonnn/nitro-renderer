import { IMessageDataWrapper } from '../../../../../core';
import { BundleDiscountRuleset } from '../../incoming';
import { IMessageParser } from './../../../../../core';

export class BundleDiscountRulesetMessageParser implements IMessageParser
{
    private _bundleDiscountRuleset: BundleDiscountRuleset;

    public flush(): boolean
    {
        this._bundleDiscountRuleset = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._bundleDiscountRuleset = new BundleDiscountRuleset(wrapper);

        return true;
    }

    public get bundleDiscountRuleset(): BundleDiscountRuleset
    {
        return this._bundleDiscountRuleset;
    }
}
