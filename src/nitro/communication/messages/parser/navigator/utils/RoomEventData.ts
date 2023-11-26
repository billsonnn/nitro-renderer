import { IMessageDataWrapper } from '../../../../../../api';

export class RoomEventData
{
    private _adId: number;
    private _ownerAvatarId: number;
    private _ownerAvatarName: string;
    private _flatId: number;
    private _categoryId: number;
    private _eventType: number;
    private _eventName: string;
    private _eventDescription: string;
    private _creationTime: string;
    private _expirationDate: Date;
    private _disposed: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._adId = wrapper.readInt();
        this._ownerAvatarId = wrapper.readInt();
        this._ownerAvatarName = wrapper.readString();
        this._flatId = wrapper.readInt();
        this._eventType = wrapper.readInt();
        this._eventName = wrapper.readString();
        this._eventDescription = wrapper.readString();

        const _local_2 = wrapper.readInt();
        const _local_3 = wrapper.readInt();
        const _local_4: Date = new Date();

        let _local_5 = _local_4.getTime();
        const _local_6 = ((_local_2 * 60) * 1000);

        _local_5 = (_local_5 - _local_6);

        const _local_7: Date = new Date(_local_5);
        this._creationTime = ((((((((_local_7.getDate() + '-') + _local_7.getMonth()) + '-') + _local_7.getFullYear()) + ' ') + _local_7.getHours()) + ':') + _local_7.getMinutes());

        let _local_8 = _local_4.getTime();
        const _local_9 = ((_local_3 * 60) * 1000);

        _local_8 = (_local_8 + _local_9);

        this._expirationDate = new Date(_local_8);
        this._categoryId = wrapper.readInt();
    }

    public dispose(): void
    {
        if(this._disposed)
        {
            return;
        }
        this._disposed = true;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public get adId(): number
    {
        return this._adId;
    }

    public get ownerAvatarId(): number
    {
        return this._ownerAvatarId;
    }

    public get ownerAvatarName(): string
    {
        return this._ownerAvatarName;
    }

    public get flatId(): number
    {
        return this._flatId;
    }

    public get categoryId(): number
    {
        return this._categoryId;
    }

    public get eventType(): number
    {
        return this._eventType;
    }

    public get eventName(): string
    {
        return this._eventName;
    }

    public get eventDescription(): string
    {
        return this._eventDescription;
    }

    public get creationTime(): string
    {
        return this._creationTime;
    }

    public get expirationDate(): Date
    {
        return this._expirationDate;
    }
}
