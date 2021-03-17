import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { ModtoolUserVisitedRoomsRoom } from './ModtoolUserVisitedRoomsRoom';


export class ModtoolRoomVisitedData
{
    private _userId:number;
    private _userName:string;
    private _rooms:ModtoolUserVisitedRoomsRoom[];

    constructor(k:IMessageDataWrapper)
    {
        this._rooms = [];
        this._userId = k.readInt();
        this._userName = k.readString();
        const _local_2 = k.readInt();
        let _local_3 = 0;
        while(_local_3 < _local_2)
        {
            this._rooms.push(new ModtoolUserVisitedRoomsRoom(k));
            _local_3++;
        }
    }

    public get userId():number
    {
        return this._userId;
    }

    public get userName():string
    {
        return this._userName;
    }

    public get rooms():ModtoolUserVisitedRoomsRoom[]
    {
        return this._rooms;
    }
}
