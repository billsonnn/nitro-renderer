import { CatalogLocalizationData } from './CatalogLocalizationData';
import { CatalogPageOfferData } from './CatalogPageOfferData';
import { CatalogFrontPageItem } from './CatalogFrontPageItem';
import { ICatalogLocalizationData } from './ICatalogLocalizationData';

export interface ICatalogPageParser
{
    readonly pageId: number;
    readonly catalogType: string;
    readonly layoutCode: string;
    readonly localization: ICatalogLocalizationData;
    readonly offers: CatalogPageOfferData[];
    readonly offerId: number;
    readonly acceptSeasonCurrencyAsCredits: boolean;
    readonly frontPageItems: CatalogFrontPageItem[];

}
