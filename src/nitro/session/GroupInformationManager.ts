import { IDisposable, IGroupInformationManager, IMessageEvent } from '../../api';
import { GetHabboGroupBadgesMessageComposer, HabboGroupBadgesMessageEvent, RoomReadyMessageEvent } from '../communication';
import { SessionDataManager } from './SessionDataManager';

export class GroupInformationManager implements IDisposable, IGroupInformationManager
{
    private _sessionDataManager: SessionDataManager;
    private _groupBadges: Map<number, string>;

    private _messages: IMessageEvent[];

    constructor(sessionDataManager: SessionDataManager)
    {
        this._sessionDataManager = sessionDataManager;
        this._groupBadges = new Map();
    }

    public init(): void
    {
        if(this._sessionDataManager && this._sessionDataManager.communication)
        {
            this._messages = [
                new RoomReadyMessageEvent(this.onRoomReadyMessageEvent.bind(this)),
                new HabboGroupBadgesMessageEvent(this.onGroupBadgesEvent.bind(this))
            ];

            for(const message of this._messages) this._sessionDataManager.communication.registerMessageEvent(message);
        }
    }

    public dispose(): void
    {
        if(this.disposed) return;

        if(this._messages && this._messages.length)
        {
            for(const message of this._messages) this._sessionDataManager.communication.removeMessageEvent(message);

            this._messages = null;
        }

        this._groupBadges = null;
        this._sessionDataManager = null;
    }

    private onRoomReadyMessageEvent(event: RoomReadyMessageEvent): void
    {
        this._sessionDataManager.send(new GetHabboGroupBadgesMessageComposer());
    }

    private onGroupBadgesEvent(event: HabboGroupBadgesMessageEvent): void
    {
        const parser = event.getParser();

        for(const [groupId, badgeId] of parser.badges.entries()) this._groupBadges.set(groupId, badgeId);
    }

    public getGroupBadge(groupId: number): string
    {
        return this._groupBadges.get(groupId);
    }

    public get disposed(): boolean
    {
        return !!this._sessionDataManager;
    }
}
