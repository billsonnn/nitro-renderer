import { IDisposable } from '../../../../../core/common/disposable/IDisposable';
import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { RoomData } from './RoomData';

export class RoomModerationData implements IDisposable
{
    private _flatId:number;
    private _userCount:number;
    private _ownerInRoom:boolean;
    private _ownerId:number;
    private _ownerName:string;
    private _room:RoomData;
    private _disposed:boolean;

    constructor(k:IMessageDataWrapper)
    {
        this._flatId = k.readInt();
        this._userCount = k.readInt();
        this._ownerInRoom = k.readBoolean();
        this._ownerId = k.readInt();
        this._ownerName = k.readString();
        this._room = new RoomData(k);
    }

    public get flatId():number
    {
        return this._flatId;
    }

    public get userCount():number
    {
        return this._userCount;
    }

    public get ownerInRoom():boolean
    {
        return this._ownerInRoom;
    }

    public get ownerId():number
    {
        return this._ownerId;
    }

    public get ownerName():string
    {
        return this._ownerName;
    }

    public get room():RoomData
    {
        return this._room;
    }

    public get disposed():boolean
    {
        return this._disposed;
    }

    public dispose():void
    {
        if(this._disposed)
        {
            return;
        }
        this._disposed = true;
        if(this._room != null)
        {
            this._room.dispose();
            this._room = null;
        }
    }
}
