import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { FlatControllerData } from './FlatControllerData';

export class FlatControllerAddedParser implements IMessageParser
{
    private _roomId: number;
    private _data: FlatControllerData;

    public flush(): boolean
    {
        this._roomId = 0;
        this._data = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId = wrapper.readInt();
        this._data = new FlatControllerData(wrapper);

        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get data(): FlatControllerData
    {
        return this._data;
    }
}
