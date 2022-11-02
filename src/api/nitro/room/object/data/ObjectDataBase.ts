import { IMessageDataWrapper } from '../../../../communication';
import { IRoomObjectModel } from '../../../../room';
import { RoomObjectVariable } from '../RoomObjectVariable';
import { IObjectData } from './IObjectData';
import { ObjectDataFlags } from './ObjectDataFlags';

export class ObjectDataBase implements IObjectData
{
    private _flags: number;
    private _uniqueNumber: number;
    private _uniqueSeries: number;

    constructor()
    {
        this._flags = 0;
        this._uniqueNumber = 0;
        this._uniqueSeries = 0;
    }

    public parseWrapper(wrapper: IMessageDataWrapper): void
    {
        if((this._flags & ObjectDataFlags.UNIQUE_SET) > 0)
        {
            this._uniqueNumber = wrapper.readInt();
            this._uniqueSeries = wrapper.readInt();
        }
    }

    public initializeFromRoomObjectModel(model: IRoomObjectModel): void
    {
        this._uniqueNumber = model.getValue<number>(RoomObjectVariable.FURNITURE_UNIQUE_SERIAL_NUMBER);
        this._uniqueSeries = model.getValue<number>(RoomObjectVariable.FURNITURE_UNIQUE_EDITION_SIZE);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void
    {
        if(!model) return;

        model.setValue(RoomObjectVariable.FURNITURE_UNIQUE_SERIAL_NUMBER, this._uniqueNumber);
        model.setValue(RoomObjectVariable.FURNITURE_UNIQUE_EDITION_SIZE, this._uniqueSeries);
    }

    public getLegacyString(): string
    {
        return '';
    }

    public compare(data: IObjectData): boolean
    {
        return false;
    }

    public get state(): number
    {
        const state = parseInt(this.getLegacyString());

        return isNaN(state) ? 0 : state;
    }

    public get isUnique(): boolean
    {
        return this._uniqueSeries > 0;
    }

    public get uniqueNumber(): number
    {
        return this._uniqueNumber;
    }

    public set uniqueNumber(number: number)
    {
        this._uniqueNumber = number;
    }

    public get uniqueSeries(): number
    {
        return this._uniqueSeries;
    }

    public set uniqueSeries(series: number)
    {
        this._uniqueSeries = series;
    }

    public get rarityLevel(): number
    {
        return -1;
    }

    public get flags(): number
    {
        return this._flags;
    }

    public set flags(flags: number)
    {
        this._flags = flags;
    }
}
