import { IMessageDataWrapper } from '../../../../../communication';
import { IRoomObjectModel } from '../../../../../room';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataKey } from '../ObjectDataKey';

export class NumberDataType extends ObjectDataBase
{
    public static FORMAT_KEY = ObjectDataKey.NUMBER_KEY;

    private static STATE: number = 0;

    private _data: number[];

    constructor()
    {
        super();

        this._data = [];
    }

    public parseWrapper(wrapper: IMessageDataWrapper): void
    {
        if(!wrapper) return;

        this._data = [];

        const totalNumbers = wrapper.readInt();

        if(totalNumbers) for(let i = 0; i < totalNumbers; i++) this._data.push(wrapper.readInt());

        super.parseWrapper(wrapper);
    }

    public initializeFromRoomObjectModel(model: IRoomObjectModel): void
    {
        super.initializeFromRoomObjectModel(model);

        this._data = model.getValue<number[]>(RoomObjectVariable.FURNITURE_DATA);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void
    {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariable.FURNITURE_DATA_FORMAT, NumberDataType.FORMAT_KEY);
        model.setValue(RoomObjectVariable.FURNITURE_DATA, this._data);
    }

    public getLegacyString(): string
    {
        if(!this._data || !this._data.length) return '';

        return this._data[NumberDataType.STATE].toString();
    }

    public compare(data: IObjectData): boolean
    {
        if(!(data instanceof NumberDataType)) return false;

        let i = 0;

        while(i < this._data.length)
        {
            if(i === 0)
            {
                //
            }
            else
            {
                if(this._data[i] !== data.getValue(i)) return false;
            }

            i++;
        }

        return true;
    }

    public getValue(index: number): number
    {
        if(!this._data || !this._data.length) return -1;

        const value = this._data[index];

        if(value === undefined || value === null) return -1;

        return value;
    }
}
