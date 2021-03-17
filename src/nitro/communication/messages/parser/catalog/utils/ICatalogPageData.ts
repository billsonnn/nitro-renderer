export interface ICatalogPageData
{
     visible: boolean;
     icon: number;
     pageId: number;
     pageName: string;
     localization: string;
     children: ICatalogPageData[];
     offerIds: number[];
}
