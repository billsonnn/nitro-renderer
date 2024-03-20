import { IGroupInformationManager } from '@nitrots/api';
import { GetCommunication, GetHabboGroupBadgesMessageComposer, HabboGroupBadgesMessageEvent, RoomReadyMessageEvent } from '@nitrots/communication';

export class GroupInformationManager implements IGroupInformationManager
{
    private _groupBadges: Map<number, string> = new Map();

    public init(): void
    {
        GetCommunication().registerMessageEvent(new RoomReadyMessageEvent(this.onRoomReadyMessageEvent.bind(this)));
        GetCommunication().registerMessageEvent(new HabboGroupBadgesMessageEvent(this.onGroupBadgesEvent.bind(this)));
    }

    private onRoomReadyMessageEvent(event: RoomReadyMessageEvent): void
    {
        GetCommunication().connection.send(new GetHabboGroupBadgesMessageComposer());
    }

    private onGroupBadgesEvent(event: HabboGroupBadgesMessageEvent): void
    {
        const parser = event.getParser();

        for(const [groupId, badgeId] of parser.badges.entries()) this._groupBadges.set(groupId, badgeId);
    }

    public getGroupBadge(groupId: number): string
    {
        return this._groupBadges.get(groupId) ?? '';
    }
}
