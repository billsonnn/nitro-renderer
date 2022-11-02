import { RoomObjectUpdateMessage } from '../../../room';
import { RoomMapData } from '../object';

export class ObjectRoomMapUpdateMessage extends RoomObjectUpdateMessage
{
    public static UPDATE_MAP: string = 'RORMUM_UPDATE_MAP';

    private _type: string;
    private _mapData: RoomMapData;

    constructor(mapData: RoomMapData)
    {
        super(null, null);

        this._type = ObjectRoomMapUpdateMessage.UPDATE_MAP;
        this._mapData = mapData;
    }

    public get type(): string
    {
        return this._type;
    }

    public get mapData(): RoomMapData
    {
        return this._mapData;
    }
}
