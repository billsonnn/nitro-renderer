import { ILinkEventTracker } from '@nitrots/api';

const linkTrackers: ILinkEventTracker[] = [];

export const AddLinkEventTracker = (tracker: ILinkEventTracker): void =>
{
    if(linkTrackers.indexOf(tracker) >= 0) return;

    linkTrackers.push(tracker);
};

export const RemoveLinkEventTracker = (tracker: ILinkEventTracker): void =>
{
    const index = linkTrackers.indexOf(tracker);

    if(index === -1) return;

    linkTrackers.splice(index, 1);
};

export const CreateLinkEvent = (link: string): void =>
{
    if(!link || (link === '')) return;

    for(const tracker of linkTrackers)
    {
        if(!tracker) continue;

        const prefix = tracker.eventUrlPrefix;

        if(prefix.length > 0)
        {
            if(link.substr(0, prefix.length) === prefix) tracker.linkReceived(link);
        }
        else
        {
            tracker.linkReceived(link);
        }
    }
};
