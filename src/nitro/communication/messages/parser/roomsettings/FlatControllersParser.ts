import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class FlatControllersParser implements IMessageParser
{
    private _roomId: number;
    private _users: Map<number, string>;

    public flush(): boolean
    {
        this._roomId = 0;
        this._users = new Map<number, string>();

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId = wrapper.readInt();

        let usersCount = wrapper.readInt();

        while(usersCount > 0)
        {
            const id = wrapper.readInt();
            const name = wrapper.readString();

            this._users.set(id, name);

            usersCount--;
        }

        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get users(): Map<number, string>
    {
        return this._users;
    }
}
