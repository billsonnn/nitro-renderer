export interface ILinkEventTracker {
  eventUrlPrefix: string;

  linkReceived(link: string): void;
}
