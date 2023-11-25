import { IMessageDataWrapper } from '../../../../../api';
import { RoomVisitData } from './RoomVisitData';

export class RoomVisitsData
{
    private _userId: number;
    private _userName: string;
    private _rooms: RoomVisitData[];

    constructor(wrapper: IMessageDataWrapper)
    {
        this._rooms = [];
        this._userId = wrapper.readInt();
        this._userName = wrapper.readString();
        const _local_2 = wrapper.readInt();
        let _local_3 = 0;
        while(_local_3 < _local_2)
        {
            this._rooms.push(new RoomVisitData(wrapper));
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
