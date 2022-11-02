import { IMessageDataWrapper } from '../../../../../../api';
import { RoomDataParser } from '../../room';

export class NavigatorSearchResultList
{
    private _code: string;
    private _data: string;
    private _action: number;
    private _closed: boolean;
    private _mode: number;
    private _rooms: RoomDataParser[];

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._code = null;
        this._data = null;
        this._action = -1;
        this._closed = false;
        this._mode = -1;
        this._rooms = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._code = wrapper.readString();
        this._data = wrapper.readString();
        this._action = wrapper.readInt();
        this._closed = wrapper.readBoolean();
        this._mode = wrapper.readInt();

        let totalRooms = wrapper.readInt();

        while(totalRooms > 0)
        {
            this._rooms.push(new RoomDataParser(wrapper));

            totalRooms--;
        }

        return true;
    }

    public get code(): string
    {
        return this._code;
    }

    public get data(): string
    {
        return this._data;
    }

    public get action(): number
    {
        return this._action;
    }

    public get closed(): boolean
    {
        return this._closed;
    }

    public get mode(): number
    {
        return this._mode;
    }

    public get rooms(): RoomDataParser[]
    {
        return this._rooms;
    }
}
