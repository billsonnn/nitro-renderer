import { CatalogPageMessageOfferData } from '../../../incoming/catalog/CatalogPageMessageOfferData';
import { FrontPageItem } from '../../../incoming/catalog/FrontPageItem';
import { ICatalogLocalizationData } from './ICatalogLocalizationData';

export interface ICatalogPageParser
{
    readonly pageId: number;
    readonly catalogType: string;
    readonly layoutCode: string;
    readonly localization: ICatalogLocalizationData;
    readonly offers: CatalogPageMessageOfferData[];
    readonly offerId: number;
    readonly acceptSeasonCurrencyAsCredits: boolean;
    readonly frontPageItems: FrontPageItem[];

}
