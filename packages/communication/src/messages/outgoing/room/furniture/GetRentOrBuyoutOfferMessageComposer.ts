import { IMessageComposer } from '@nitrots/api';

export class GetRentOrBuyoutOfferMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetRentOrBuyoutOfferMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetRentOrBuyoutOfferMessageComposer>;

    constructor(isWall: boolean, furnitureFullName: string, isBuyout: boolean)
    {
        this._data = [isWall, furnitureFullName, isBuyout];
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
