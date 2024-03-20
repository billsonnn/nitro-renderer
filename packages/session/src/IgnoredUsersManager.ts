import { IIgnoredUsersManager } from '@nitrots/api';
import { GetCommunication, GetIgnoredUsersComposer, IgnoreResultEvent, IgnoreUserComposer, IgnoreUserIdComposer, IgnoredUsersEvent, UnignoreUserComposer } from '@nitrots/communication';

export class IgnoredUsersManager implements IIgnoredUsersManager
{
    private _ignoredUsers: string[] = [];

    public init(): void
    {
        GetCommunication().registerMessageEvent(new IgnoredUsersEvent(this.onIgnoredUsersEvent.bind(this)));
        GetCommunication().registerMessageEvent(new IgnoreResultEvent(this.onIgnoreResultEvent.bind(this)));
    }

    public requestIgnoredUsers(username: string): void
    {
        GetCommunication().connection.send(new GetIgnoredUsersComposer(username));
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
        GetCommunication().connection.send(new IgnoreUserIdComposer(id));
    }

    public ignoreUser(name: string): void
    {
        GetCommunication().connection.send(new IgnoreUserComposer(name));
    }

    public unignoreUser(name: string): void
    {
        GetCommunication().connection.send(new UnignoreUserComposer(name));
    }

    public isIgnored(name: string): boolean
    {
        return (this._ignoredUsers.indexOf(name) >= 0);
    }
}
