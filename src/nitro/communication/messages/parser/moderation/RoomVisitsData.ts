import { IMessageDataWrapper } from '../../../../../api';
import { RoomVisitData } from './RoomVisitData';

export class RoomVisitsData
{
    private _userId: number;
    private _userName: string;
    private _rooms: RoomVisitData[];

    constructor(k: IMessageDataWrapper)
    {
        this._rooms = [];
        this._userId = k.readInt();
        this._userName = k.readString();
        const _local_2 = k.readInt();
        let _local_3 = 0;
        while(_local_3 < _local_2)
        {
            this._rooms.push(new RoomVisitData(k));
            _local_3++;
        }
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._userName;
    }

    public get rooms(): RoomVisitData[]
    {
        return this._rooms;
    }
}
