import { IObjectData } from '@nitrots/api';

export class ObjectData
{
    private _id: number = 0;
    private _state: number = 0;
    private _data: IObjectData;

    constructor(id: number, state: number, objectData: IObjectData)
    {
        this._id = id;
        this._state = state;
        this._data = objectData;
    }

    public get id(): number
    {
        return this._id;
    }

    public get state(): number
    {
        return this._state;
    }

    public get data(): IObjectData
    {
        return this._data;
    }
}
