import { IObjectData } from '../../../api';
import { RoomObjectUpdateMessage } from '../../../room';

export class ObjectDataUpdateMessage extends RoomObjectUpdateMessage
{
    private _state: number;
    private _data: IObjectData;
    private _extra: number;

    constructor(state: number, data: IObjectData, extra: number = null)
    {
        super(null, null);

        this._state = state;
        this._data = data;
        this._extra = extra;
    }

    public get state(): number
    {
        return this._state;
    }

    public get data(): IObjectData
    {
        return this._data;
    }

    public get extra(): number
    {
        return this._extra;
    }
}
