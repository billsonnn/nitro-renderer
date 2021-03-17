export interface ILinkEventTracker
{
    linkReceived(link: string): void;
    eventUrlPrefix: string;
}