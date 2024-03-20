export interface INodeData
{
    visible: boolean;
    icon: number;
    pageId: number;
    pageName: string;
    localization: string;
    children: INodeData[];
    offerIds: number[];
}
