import { IDisposable, IIgnoredUsersManager, IMessageEvent } from '../../api';
import { GetIgnoredUsersComposer, IgnoredUsersEvent, IgnoreResultEvent, IgnoreUserComposer, IgnoreUserIdComposer, UnignoreUserComposer } from '../communication';
import { SessionDataManager } from './SessionDataManager';

export class IgnoredUsersManager implements IDisposable, IIgnoredUsersManager
{
    private _sessionDataManager: SessionDataManager;
    private _ignoredUsers: string[];

    private _messages: IMessageEvent[];

    constructor(sessionDataManager: SessionDataManager)
    {
        this._sessionDataManager = sessionDataManager;
        this._ignoredUsers = [];
    }

    public init(): void
    {
        if(this._sessionDataManager && this._sessionDataManager.communication)
        {
            this._messages = [
                new IgnoredUsersEvent(this.onIgnoredUsersEvent.bind(this)),
                new IgnoreResultEvent(this.onIgnoreResultEvent.bind(this))
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

        this._sessionDataManager = null;
    }

    public requestIgnoredUsers(): void
    {
        this._sessionDataManager.send(new GetIgnoredUsersComposer(this._sessionDataManager.userName));
    }

    private onIgnoredUsersEvent(event: IgnoredUsersEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this._ignoredUsers = parser.ignoredUsers;
    }

    private onIgnoreResultEvent(event: IgnoreResultEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        const name = parser.name;

        switch(parser.result)
        {
            case 0:
                return;
            case 1:
                this.addUserToIgnoreList(name);
                return;
            case 2:
                this.addUserToIgnoreList(name);
                this._ignoredUsers.shift();
                return;
            case 3:
                this.removeUserFromIgnoreList(name);
                return;
        }
    }

    private addUserToIgnoreList(name: string): void
    {
        if(this._ignoredUsers.indexOf(name) < 0) this._ignoredUsers.push(name);
    }

    private removeUserFromIgnoreList(name: string): void
    {
        const index = this._ignoredUsers.indexOf(name);

        if(index >= 0) this._ignoredUsers.splice(index, 1);
    }

    public ignoreUserId(id: number): void
    {
        this._sessionDataManager.send(new IgnoreUserIdComposer(id));
    }

    public ignoreUser(name: string): void
    {
        this._sessionDataManager.send(new IgnoreUserComposer(name));
    }

    public unignoreUser(name: string): void
    {
        this._sessionDataManager.send(new UnignoreUserComposer(name));
    }

    public isIgnored(name: string): boolean
    {
        return (this._ignoredUsers.indexOf(name) >= 0);
    }

    public get disposed(): boolean
    {
        return !!this._sessionDataManager;
    }
}
