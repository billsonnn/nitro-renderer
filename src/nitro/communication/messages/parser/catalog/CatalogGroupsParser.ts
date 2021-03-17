import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { CatalogGroupData } from './utils/CatalogGroupData';

export class CatalogGroupsParser implements IMessageParser
{
    private _groups: CatalogGroupData[];

    public flush(): boolean
    {
        this._groups = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalOffers = wrapper.readInt();

        while(totalOffers > 0)
        {
            this._groups.push(new CatalogGroupData(wrapper));

            totalOffers--;
        }

        return true;
    }

    public get groups(): CatalogGroupData[]
    {
        return this._groups;
    }
}
