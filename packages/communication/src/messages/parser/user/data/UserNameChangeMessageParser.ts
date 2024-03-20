import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class UserNameChangeMessageParser implements IMessageParser
{
    private _webId: number;
    private _id: number;
    private _newName: string;

    public flush(): boolean
    {
        this._webId = -1;
        this._id = -1;
        this._newName = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._webId = wrapper.readInt();
        this._id = wrapper.readInt();
        this._newName = wrapper.readString();

        return true;
    }

    public get webId(): number
    {
        return this._webId;
    }

    public get id(): number
    {
        return this._id;
    }

    public get newName(): string
    {
        return this._newName;
    }
}
