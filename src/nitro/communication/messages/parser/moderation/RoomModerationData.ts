import { IDisposable, IMessageDataWrapper } from '../../../../../api';
import { ModRoomData } from './ModRoomData';

export class RoomModerationData implements IDisposable
{
    private _flatId: number;
    private _userCount: number;
    private _ownerInRoom: boolean;
    private _ownerId: number;
    private _ownerName: string;
    private _room: ModRoomData;
    private _disposed: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._flatId = wrapper.readInt();
        this._userCount = wrapper.readInt();
        this._ownerInRoom = wrapper.readBoolean();
        this._ownerId = wrapper.readInt();
        this._ownerName = wrapper.readString();
        this._room = new ModRoomData(wrapper);
    }

    public get flatId(): number
    {
        return this._flatId;
    }

    public get userCount(): number
    {
        return this._userCount;
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

    public get room(): ModRoomData
    {
        return this._room;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public dispose(): void
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
