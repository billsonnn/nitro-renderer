import { IMessageDataWrapper, IMessageParser } from '../../../../../core';
import { CatalogGroupData } from '../catalog/utils/CatalogGroupData';

export class GuildMembershipsMessageParser implements IMessageParser
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
