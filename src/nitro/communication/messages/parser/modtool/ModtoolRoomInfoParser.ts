import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class ModtoolRoomInfoParser implements IMessageParser
{
    private _id: number;
    private _playerAmount: number;
    private _owner: boolean;
    private _ownerId: number;
    private _ownerName: string;
    private _bool: boolean;
    private _name: string;
    private _description: string;
    private _tagsTotal: number;

    public flush(): boolean
    {
        this._id   = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._id   = wrapper.readInt();
        this._playerAmount = wrapper.readInt();
        this._owner = wrapper.readBoolean();
        this._ownerId = wrapper.readInt();
        this._ownerName = wrapper.readString();
        this._bool = wrapper.readBoolean();
        this._name = wrapper.readString();
        this._description = wrapper.readString();
        this._tagsTotal = wrapper.readInt();

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

    public get owner(): boolean
    {
        return this._owner;
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
}
