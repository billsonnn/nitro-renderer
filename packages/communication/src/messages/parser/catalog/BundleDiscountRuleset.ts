import { IMessageDataWrapper } from '@nitrots/api';

export class BundleDiscountRuleset
{
    private _maxPurchaseSize: number;
    private _bundleSize: number;
    private _bundleDiscountSize: number;
    private _bonusThreshold: number;
    private _additionalBonusDiscountThresholdQuantities: number[];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._maxPurchaseSize = wrapper.readInt();
        this._bundleSize = wrapper.readInt();
        this._bundleDiscountSize = wrapper.readInt();
        this._bonusThreshold = wrapper.readInt();
        this._additionalBonusDiscountThresholdQuantities = [];

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._additionalBonusDiscountThresholdQuantities.push(wrapper.readInt());

            count--;
        }
    }

    public get maxPurchaseSize(): number
    {
        return this._maxPurchaseSize;
    }

    public get bundleSize(): number
    {
        return this._bundleSize;
    }

    public get bundleDiscountSize(): number
    {
        return this._bundleDiscountSize;
    }

    public get bonusThreshold(): number
    {
        return this._bonusThreshold;
    }

    public get additionalBonusDiscountThresholdQuantities(): number[]
    {
        return this._additionalBonusDiscountThresholdQuantities;
    }
}
