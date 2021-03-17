import { RoomObjectUpdateMessage } from '../../../room/messages/RoomObjectUpdateMessage';

export class ObjectItemDataUpdateMessage extends RoomObjectUpdateMessage
{
    private _data: string;

    constructor(data: string)
    {
        super(null, null);

        this._data = data;
    }

    public get data(): string
    {
        return this._data;
    }
}