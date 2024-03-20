import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class IgnoredUsersParser implements IMessageParser
{
    private _ignoredUsers: string[];

    public flush(): boolean
    {
        this._ignoredUsers = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._ignoredUsers = [];

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._ignoredUsers.push(wrapper.readString());

            count--;
        }

        return true;
    }

    public get ignoredUsers(): string[]
    {
        return this._ignoredUsers;
    }
}
