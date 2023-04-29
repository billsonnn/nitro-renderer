import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { CatalogPageMessageProductData } from '../../catalog';

export class WeeklyGameRewardParser implements IMessageParser
{
    private _gameTypeId: number;
    private _products: CatalogPageMessageProductData[];
    private _minutesUntilNextWeek: number;
    private _rewardingOn: boolean;

    public flush(): boolean
    {
        this._gameTypeId = -1;
        this._products = [];
        this._minutesUntilNextWeek = 0;
        this._rewardingOn = true;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._gameTypeId = wrapper.readInt();
        let totalProducts: number = wrapper.readInt();

        while(totalProducts > 0)
        {
            this._products.push(new CatalogPageMessageProductData(wrapper));
            totalProducts--;
        }

        this._minutesUntilNextWeek = wrapper.readInt();
        this._rewardingOn = wrapper.readBoolean();

        return true;
    }

    public get gameTypeId(): number
    {
        return this._gameTypeId;
    }

    public get products(): CatalogPageMessageProductData[]
    {
        return this._products;
    }

    public get minutesUntilNextWeek(): number
    {
        return this._minutesUntilNextWeek;
    }

    public get rewardingOn(): boolean
    {
        return this._rewardingOn;
    }
}
