import { IDisposable } from '../../core/common/disposable/IDisposable';
import { IMessageEvent } from '../../core/communication/messages/IMessageEvent';
import { GroupBadgesEvent } from '../communication/messages/incoming/group/GroupBadgesEvent';
import { GroupBadgesComposer } from '../communication/messages/outgoing/group/GroupBadgesComposer';
import { SessionDataManager } from './SessionDataManager';

export class GroupInformationManager implements IDisposable
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
                new GroupBadgesEvent(this.onGroupBadgesEvent.bind(this))
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

    public requestGroupBadges(): void
    {
        this._sessionDataManager.send(new GroupBadgesComposer());
    }

    private onGroupBadgesEvent(event: GroupBadgesEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this._groupBadges = parser.badges;
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
