import { ICatalogPageData } from './ICatalogPageData';

export class CatalogSearchData implements ICatalogPageData
{
    private _children: ICatalogPageData[];
    constructor(pages: ICatalogPageData[])
    {
        this._children = pages;
    }

    public get children(): ICatalogPageData[]
    {
        return this._children;
    }

    public get icon(): number
    {
        return -1;
    }

    public get localization(): string
    {
        return '';
    }

    public get offerIds(): number[]
    {
        return [];
    }

    public get pageId(): number
    {
        return -1;
    }

    public get pageName(): string
    {
        return '';
    }

    public get visible(): boolean
    {
        return true;
    }

}
