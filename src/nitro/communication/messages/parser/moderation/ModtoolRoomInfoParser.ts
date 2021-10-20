import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class ModtoolRoomInfoParser implements IMessageParser
{
    private _id: number;
    private _playerAmount: number;
    private _ownerInRoom: boolean;
    private _ownerId: number;
    private _ownerName: string;
    private _name: string;
    private _description: string;
    private _tags: string[];

    public flush(): boolean
    {
        this._id   = null;
        this._playerAmount = 0;
        this._ownerInRoom = false;
        this._ownerId = 0;
        this._ownerName = null;
        this._name = null;
        this._description = null;
        this._tags = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._id = wrapper.readInt();
        this._playerAmount = wrapper.readInt();
        this._ownerInRoom = wrapper.readBoolean();
        this._ownerId = wrapper.readInt();
        this._ownerName = wrapper.readString();
        wrapper.readBoolean();
        this._name = wrapper.readString();
        this._description = wrapper.readString();
        const tagsTotal = wrapper.readInt();

        this._tags = [];

        for(let i = 0; i < tagsTotal; i++)
        {
            this._tags.push(wrapper.readString());
        }

        return true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get playerAmount(): number
    {
        return this._playerAmount;
    }

    public get ownerInRoom(): boolean
    {
        return this._ownerInRoom;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public get name(): string
    {
        return this._name;
    }

    public get description(): string
    {
        return this._description;
    }

    public get tags(): string[]
    {
        return this._tags;
    }
}
